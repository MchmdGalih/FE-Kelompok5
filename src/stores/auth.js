import { ref } from "vue";
import { defineStore } from "pinia";

import { apiClient } from "@/config/api";

export const authStore = defineStore("auth", () => {
  const token = ref(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  const currentUser = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const isLoading = ref(false);

  async function register({ name, email, password, password_confirmation }) {
    isLoading.value = true;

    try {
      const { data } = await apiClient.post("/auth/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      const succesMessage = data.message;
      alert(succesMessage);

      router.replace("/login");
    } catch (error) {
      console.log(error.message);
    } finally {
      isLoading.value = false;
    }
  }

  async function login({ email, password }) {
    isLoading.value = true;
    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
      token.value = data.token;
      localStorage.setItem("token", token.value);
      currentUser.value = data.user;
      localStorage.setItem("user", JSON.stringify(currentUser.value));
    } catch (error) {
      console.log(error.message);
    } finally {
      isLoading.value = false;
    }
  }

  return { token, register, currentUser, isLoading, login };
});
