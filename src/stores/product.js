import { ref } from "vue";
import { defineStore } from "pinia";
import { apiClient } from "@/config/api";

export const useProductsStore = defineStore("product", () => {
  const products = ref([]);

  const getProduct = async () => {
    try {
      const response = await apiClient.get("/product");
      products.value = response.data.data.data;
      return response.data.data;
    } catch (error) {
      console.log(error.message);
    }

    
  };

  const addProduct = async (product) => {
    try {
      const response = await apiClient.post("/product", product);
      console.log(response.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  return { products, getProduct, addProduct };
});
