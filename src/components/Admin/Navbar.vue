<template>
  <div class="navbar bg-blue-500 px-6">
    <!-- Brand -->
    <div class="flex-1 gap-3">
      <RouterLink to="/" class="btn btn-ghost normal-case text-white text-3xl">
        TokoKita
      </RouterLink>
    </div>

    <!-- Right Section -->
    <div class="flex-none">
      <!-- Notifications -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </div>
        <div
          tabindex="0"
          class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
        >
          <div class="card-body">
            <span class="text-lg font-bold">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Dropdown -->
      <div class="dropdown dropdown-end" @click="toggleDropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              v-if="auth.currentUser?.profile"
              alt="Profile"
              :src="auth.currentUser.profile.image"
            />
            <img
              v-else
              alt="Default Profile"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          v-if="isDropdownOpen"
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <!-- Profile -->
          <li v-if="user">
            <RouterLink :to="`/profile/${user.id}`" class="justify-between">
              Profile
              <span class="badge">{{ user.name }}</span>
            </RouterLink>
          </li>

          <!-- Logout -->
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
import { useRouter } from "vue-router";

const auth = authStore();
const router = useRouter();
const user = auth.currentUser;

let isDropdownOpen = false;

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen = !isDropdownOpen;
};

// Logout Function
const onLogout = async () => {
  try {
    await auth.logout();
    router.push("/login"); // Redirect to login page
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};
</script>