import { ref } from "vue";
import { defineStore } from "pinia";
import { apiClient } from "@/config/api";

export const useCategoryStore = defineStore("category", () => {
  const category = ref([]);

  const getCategory = async () => {
    try {
      const response = await apiClient.get("/category");
      category.value = response.data.data;
      return response.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return { category, getCategory };
});
