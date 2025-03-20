<template>
  <div class="navbar bg-blue-500 px-6 gap-2">
    <div class="flex-1 gap-3">
      <RouterLink to="/" class="btn btn-ghost normal-case text-white text-3xl"
        >TokoKita</RouterLink
      >
    </div>

    <RouterLink to="/dashboard/product" class="text-white font-bold"
      >Dashboard</RouterLink
    >
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              v-if="auth.currentUser?.profile"
              alt="Tailwind CSS Navbar component"
              :src="auth.currentUser.profile.image"
            />
            <img
              v-else
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li v-if="user">
            <RouterLink :to="`/profile/${user.id}`" class="justify-between">
              Profile
              <span class="badge" v-if="user">{{
                user ? user.name : "profile"
              }}</span>
            </RouterLink>
          </li>
           <li v-if="user?.role?.name === 'admin'">
            <RouterLink to="/dashboard">Dashboard</RouterLink>
          </li>
          <li v-if="user?.role?.name === 'admin' || user?.role?.name === 'user'">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <button v-if="user" @click="onLogout">Logout</button>
            <RouterLink v-else to="/login">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from "@/stores/auth";
const auth = authStore();
const user = auth.currentUser;
// const isAdmin = auth.currentUser.role?.name === "admin";
const onLogout = async () => {
  await auth.logout();
};
</script>
