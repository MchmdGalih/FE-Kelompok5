<template>
  <Default>
    <div class="w-full p-4">
      <div class="max-w-6xl mx-auto flex sm:flex-row flex-col h-full p-6">
        <div class="w-1/2 border border-r-stone-950">
          <img
            :src="productDetail.image"
            :alt="productDetail.name"
            class="w-full object-cover"
          />
        </div>

        <div class="w-full p-4">
          <div class="flex flex-col gap-1 md:gap-3">
            <div class="flex gap-2 items-center">
              <h1 class="font-bold text-black text-md md:text-6xl">
                {{ productDetail.name }}
              </h1>

              <span
                class="p-1 md:p-2 border border-black text-sm md:text-xl text-stone-900 rounded-sm"
                >{{ productDetail.category?.name }}</span
              >
            </div>
            <h2 class="text-sm md:text-4xl font-semibold text-stone-900">
              {{ productDetail.description }}
            </h2>
            <div class="flex items-center justify-between gap-2">
              <p class="text-sm md:text-2xl font-medium text-stone-900">
                Harga: {{ formatter.format(productDetail.price) }}
              </p>

              <p class="text-sm md:text-xl font-medium text-stone-900">
                Stok: {{ productDetail.stock }}
              </p>
            </div>

            <div class="" v-if="productDetail.stock > 0">
              <button
                class="w-full border border-black p-2 rounded-sm font font-medium text-black hover:bg-black hover:text-white transform transition duration-300 ease-in-out"
                @click="openModal"
              >
                Buy
              </button>
            </div>
            <div v-else class="text-sm md:text-xl font-medium text-stone-900">
              Stok habis
            </div>
          </div>
        </div>
      </div>
      <ModalOrder
        v-if="showModal"
        :dataProps="productDetail"
        @close-modal="closeModal"
        @kirim-data="handleSubmit"
      />
    </div>
  </Default>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/product";
import { formatter } from "@/utils/formatted";
import Default from "@/layouts/Default.vue";
import ModalOrder from "@/components/Modal/ModalOrder.vue";
import { apiClient } from "@/config/api";

const route = useRoute();
const id = route.params.id;
const stores = useProductsStore();
const productDetail = ref({});
const showModal = ref(false);

const handleSubmit = async (data) => {
  showModal.value = data[1];
  try {
    const res = await apiClient.post("/order", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const snapToken = res.data.snap_token;
    snap.pay(snapToken, {
      onSuccess: function (result) {
        console.log("success");
        console.log(result);
      },
      onPending: function (result) {
        console.log("pending");
        console.log(result);
      },
      onError: function (result) {
        console.log("error");
        console.log(result);
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });
  } catch (error) {
    console.log(error);
  }
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
