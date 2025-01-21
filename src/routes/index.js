import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Dashboard from "@/views/Admin/Dashboard.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import VerifyAccount from "@/views/VerifyAccount.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
    meta: {
      layout: "Default",
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      layout: "Dashboard",
    },
  },

  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/verify-account",
    component: VerifyAccount,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
