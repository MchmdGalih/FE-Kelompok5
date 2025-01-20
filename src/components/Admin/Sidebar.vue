<>
<template>
  <aside class="w-64 bg-gray-800 text-white h-full flex flex-col">
    <div class="p-4 text-center text-xl font-bold border-b border-gray-700">
      Admin Panel
    </div>
    <nav class="flex-grow">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.name"
          class="border-b border-gray-700"
        >
          <router-link
            :to="item.link"
            class="block p-4 hover:bg-gray-700 transition-colors"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t border-gray-700">
      <button
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
const menuItems = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Products", link: "/products" },
  { name: "Orders", link: "/orders" },
];
</script>
