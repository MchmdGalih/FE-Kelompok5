<template>
  <div>
    <!-- Search -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search products..."
        class="input input-bordered w-full"
      />
    </div>

    <!-- Product Cards -->
    <div
      class="card card-compact bg-base-100 md:w-96 sm:w-full shadow-xl"
      v-for="data in filteredProducts"
      :key="data.id"
    >
      <figure class="w-full h-[300px]">
        <img :src="data.image" alt="Shoes" class="w-full h-full object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ data.name }}</h2>
        <p>{{ data.description }}</p>
        <p>{{ formatter.format(data.price) }}</p>
        <p>stock: {{ data.stock }}</p>
        <div class="card-actions justify-end">
          <RouterLink :to="`/product/${data.id}`" class="btn btn-primary"
            >Buy Now</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { formatter } from "@/utils/formatted";
import { RouterLink } from "vue-router";

// Data props
const props = defineProps({
  dataProps: {
    type: Array,
    default: [],
  },
});

// Reactive search query
const searchQuery = ref("");

// Computed property for filtered products
const filteredProducts = computed(() =>
  props.dataProps.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>


