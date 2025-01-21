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

  async function register({ name, email, password, password_confirmation }) {
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
    }
  }

  async function login({ email, password }) {
    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
      token.value = data.token;
      localStorage.setItem("token", token.value);
      currentUser.value = data.user;
      localStorage.setItem("user", JSON.stringify(currentUser.value));
    } catch (error) {
      console.log(error.message);
    }
  }

  async function logout() {
    try {
      const { data } = await apiClient.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      token.value = null;
      localStorage.removeItem("token");
      currentUser.value = null;
      localStorage.removeItem("user");

      alert(data.message);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function getUserLogged() {
    try {
      const { data } = await apiClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(currentUser.value));
    } catch (error) {
      console.log(error.message);
    }
  }

  // async function verifyAccount(otp) {
  //   try {
  //     const { data } = await apiClient.post("/auth/verify-account", {

  //     })
  //   } catch (error) {}
  // }

  return {
    token,
    register,
    currentUser,
    login,
    logout,
    getUserLogged,
  };
});
