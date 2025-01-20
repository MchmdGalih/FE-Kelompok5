import { ref } from "vue";
import { defineStore } from "pinia";

export const authStore = defineStore("auth", () => {
  const token = ref("");
  const currentUser = ref("");
  async function register() {
    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return { token, register, currentUser };
});
