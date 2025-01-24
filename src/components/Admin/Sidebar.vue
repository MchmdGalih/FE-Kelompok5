<!-- Sidebar.vue -->
<template>
  <div class="bg-base-200 w-64 min-h-screen p-4">
    <!-- Logo/Brand -->
    <div class="mb-6">
      <RouterLink to="/dashboard" class="text-2xl font-bold"
        >Dashboard Admin</RouterLink
      >
    </div>

    <!-- Main Menu -->
    <ul class="menu menu-sm bg-base-100 rounded-box">
      <li></li>
      <li>
        <router-link to="/dashboard/product">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Produk
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/category">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Category
        </router-link>
      </li>
    </ul>

    <!-- Divider -->
    <div class="divider"></div>

    <!-- Bottom Menu -->
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "Sidebar",
};
</script>
