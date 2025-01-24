import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Dashboard from "@/views/Admin/Dashboard.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import VerifyAccount from "@/views/VerifyAccount.vue";
import Category from "@/views/Admin/Category.vue";
import CategoryDetail from "@/views/CategoryDetail.vue";
import Product from "@/views/Admin/Product.vue";
import Profile from "@/views/Profile.vue";
import DetailProduct from "@/views/DetailProduct.vue";
import { authStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    component: HomePage,
    meta: {
      layout: "Default",
    },
  },

  {
    path: "/profile/:id",
    component: Profile,
    meta: {
      layout: "Default",
    },
  },
  {
    path: "/product/:id",
    component: DetailProduct,
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
    // meta: { isAuth: true },
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/verify-account",
    component: VerifyAccount,
  },
  {
    path: "/dashboard/category",
    component: Category,
    meta: {
      layout: "Dashboard",
      // isAdmin: true,
    },
  },
  {
    path: "/category/:id",
    component: CategoryDetail,
    meta: {
      layout: "Default",
    },
  },
  {
    path: "/dashboard/product",
    component: Product,
    meta: {
      layout: "Dashboard",
      isAdmin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = authStore();
  if (to.meta.isAuth && store.token) {
    alert("Anda sudah login");
    return next("/");
  }

  if (to.meta.isAdmin && store.currentUser.role.name !== "admin") {
    
    alert("Anda bukan admin");
    return next("/");
  }

  next();
});

export default router;
