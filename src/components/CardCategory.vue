<template>
  <div
    v-for="item in dataProps"
    :key="item.id"
    class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
  >
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        {{ item.name }}
      </h3>
      <p class="text-gray-600 text-sm mb-4">
        {{
          item.description ||
          "Details category yg anda pilih lihat lebih lanjut disini"
        }}
      </p>

      <RouterLink
        :to="`/category/${item.id}`"
        class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      >
        Details
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dataProps: {
    type: Array,
    required: true,
  },
});
</script>
