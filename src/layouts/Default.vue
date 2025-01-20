<template>
  <section class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 p-4">
      <slot></slot>
    </main>

    <Footer />
  </section>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>
