import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Dashboard from "@/views/Admin/Dashboard.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
