<template>
  <section class="min-h-screen flex flex-col">
    <NavbarDaisy />
    <main class="flex-1 bg-white">
      <slot></slot>
    </main>
    <Footer />
  </section>
</template>

<script setup>
import Footer from "@/components/Footer.vue";
import NavbarDaisy from "@/components/NavbarDaisy.vue";
</script>
