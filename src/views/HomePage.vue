<template>
  <DefaultLayout>
    <Hero />

    <div class="py-4">
      <Search />

      <div class="py-4 px-8 mt-4">
        <h1 class="text-3xl font-bold px-4 text-black mb-2">List Category</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card :dataProps="category.category" />
        </div>
      </div>

      <div class="py-4 px-8 mt-4">
        <h1 class="text-3xl font-bold px-4 text-black mb-4">List Product</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardProduct :dataProps="product.products" />
        </div>
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
import Search from "@/components/Search.vue";
import Card from "@/components/CardCategory.vue";
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
