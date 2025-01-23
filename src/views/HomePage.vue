<template>
  <DefaultLayout>
    <Hero />

    <div class="px-10">
      <div class="flex flex-wrap gap-2 py-4">
        <div v-if="isLoading">
          <span
            class="loading loading-spinner text-primary"
            v-for="i in 5"
            :key="i"
          ></span>
        </div>
        <RouterLink
          v-else
          class="px-10 py-2 text-black border border-black font-italic rounded-md"
          v-for="item in category.category"
          :key="item.id"
          :to="`/category/${item.id}`"
          >{{ item.name }}</RouterLink
        >
      </div>
    </div>

    <div class="py-4 px-10 mt-4">
      <h1 class="text-4xl font-bold text-black mb-4">Recommeded for you</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        <div v-if="isLoading">
          <div class="flex w-52 flex-col gap-4">
            <div class="skeleton h-32 w-full"></div>
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
          </div>
        </div>

        <CardProduct :dataProps="product.products" v-else />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@/stores/category";
import { useProductsStore } from "@/stores/product";
import DefaultLayout from "@/layouts/Default.vue";
import Hero from "@/components/Hero.vue";
import CardProduct from "@/components/CardProduct.vue";

const category = useCategoryStore();
const product = useProductsStore();
const isLoading = ref(true);

const handleGetCategory = async () => {
  try {
    const res = await category.getCategory();
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const handleGetProduct = async () => {
  try {
    const res = await product.getProduct();
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  handleGetCategory();
  handleGetProduct();
});
</script>
