<template>
  <Default>
    <section class="w-full">
      <div class="p-10">
        <h1 class="text-3xl text-center">
          INI HALAMAN PROFILE {{ user.name }}
        </h1>
      </div>
    </section>
  </Default>
</template>

<script setup>
import Default from "@/layouts/Default.vue";
import { authStore } from "@/stores/auth";
import { onMounted, ref } from "vue";

const store = authStore();
const user = store.currentUser;
</script>
