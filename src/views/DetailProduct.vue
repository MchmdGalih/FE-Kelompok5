<template>
  <Default>
    <div class="flex justify-center items-center py-10">
      <div class="card bg-base-100 w-96 shadow-xl">
        <figure class="h-[400px]">
          <img
            :src="productDetail.image"
            :alt="productDetail.name"
            class="object-cover"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ productDetail.name }}</h2>
          <span class="badge badge-secondary">{{
            productDetail.category?.name
          }}</span>
          <p>{{ productDetail.description }}</p>
          <p>{{ formatter.format(productDetail.price) }}</p>
          <p>Stock: {{ productDetail.stock }}</p>

          <div
            class="card-actions justify-between"
            v-if="productDetail.stock > 0"
          >
            <select
              class="select select-bordered w-20"
              v-model="productDetail.qty"
            >
              <option
                v-for="qty in productDetail.stock"
                :key="qty"
                :value="qty"
              >
                {{ qty }}
              </option>
            </select>
            <button class="btn btn-primary" @click="openModal">Buy</button>
          </div>
          <div v-else class="text-red-500 font-bold">Stok habis</div>
        </div>
      </div>
    </div>
    <ModalOrder
      v-if="showModal"
      :dataProps="productDetail"
      @close-modal="closeModal"
      @kirim-data="handleSubmit"
    />
  </Default>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/product";
import { formatter } from "@/utils/formatted";
import Default from "@/layouts/Default.vue";
import ModalOrder from "@/components/Modal/ModalOrder.vue";

const route = useRoute();
const id = route.params.id;
const stores = useProductsStore();
const productDetail = ref({});
const showModal = ref(false);

const handleSubmit = (data) => {
  showModal.value = data[1];
};
const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(async () => {
  productDetail.value = await stores.getProductById(id);
});
</script>
