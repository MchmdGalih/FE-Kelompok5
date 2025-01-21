<template>
  <header
    class="flex justify-between items-center p-6 bg-green-500 bg-opacity-50 relative z-20"
  >
    <div class="text-white text-2xl font-serif font-bold">TokoKita</div>
    <!-- untuk mobile toggle button-->
    <div class="md:hidden z-30">
      <button
        type="button"
        class="block focus:outline-none"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span v-if="isMenuOpen" class="text-5xl">
          <img
            src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png"
            alt="close"
            width="50"
            height="50"
          />
        </span>
        <span v-else class="text-5xl">
          <img
            src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png"
            alt="menu"
            width="50"
            height="50"
          />
        </span>
      </button>
    </div>
    <!-- Navbar Link-->
    <nav
      :class="[
        'fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:relative md:bg-transparent md:flex md:justify-between md:pr-4 md:flex-row',
        isMenuOpen ? 'block' : 'hidden',
      ]"
    >
      <ul
        class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0 font-mono"
      >
        <li v-for="item in menu" :key="item.id">
          <router-link
            :to="item.url"
            class="block text-white transition hover:text-primary ease-linear text-2xl md:text-lg"
            @click="scrollToSection(item.url)"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="dropdown dropdown-bottom">
      <div tabindex="0" role="button" class="m-1">
        <div class="avatar cursor-pointer">
          <div class="w-12 rounded-full">
            <img
              :src="
                user.profile ||
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              "
            />
          </div>
        </div>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
      >
        <li v-if="user">
          <span>{{ user ? user.name : "" }}</span>
        </li>
        <li>
          <button v-if="user" @click="onLogout">Logout</button>
          <RouterLink v-else to="/login">Login</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>
<script setup>
import { ref, computed } from "vue";
import { authStore } from "@/stores/auth";

const auth = authStore();
const user = auth.currentUser;

const menu = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Product", url: "/product" },
  { id: 3, name: "Category", url: "/category" },
  { id: 4, name: "Contact", url: "/contact" },
];
const isMenuOpen = ref(false);
const scrollToSection = (url) => {
  isMenuOpen.value = false;
  elementRef.value.scrollIntoView({ behavior: "smooth" });
};

const onLogout = async () => {
  await auth.logout();
};
</script>
