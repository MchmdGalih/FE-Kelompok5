import { ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const cartItem = ref([]);

  const addToCart = (product, quantity) => {
    const item = cartItem.value.find((item) => item.product.id === product.id);
    console.log(item);
  };

  return { cartItem, addToCart };
});
