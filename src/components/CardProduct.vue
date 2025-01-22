<template>
  <div
    class="card card-compact bg-base-100 md:w-96 sm:w-full shadow-xl"
    v-for="data in dataProps"
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
</template>

<script setup>
import { formatter } from "@/utils/formatted";
import { RouterLink } from "vue-router";
const props = defineProps({
  dataProps: {
    type: Array,
    default: [],
  },
});
</script>
