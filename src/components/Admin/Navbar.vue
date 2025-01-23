<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <div class="text-lg font-bold font-roboto">Admin Dashboard</div>
    <div class="flex items-center space-x-4">
      <button 
        class="p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      </button>
      <div class="relative">
        <button 
          @click="toggleDropdown"
          class="flex items-center space-x-2"
        >
          <img
            :src="profileImageUrl"
            alt="Profile"
            class="w-10 h-10 rounded-full object-cover"
          />
          <span class="font-semibold">{{ adminName }}</span>
        </button>
        <div 
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-10"
        >
          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Profile</span>
          </button>
          <button
            @click="handleLogout"
            class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-2 text-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  adminName: {
    type: String,
    default: 'Admin'
  },
  profileImageUrl: {
    type: String,
    default: '/api/placeholder/40/40'
  }
})

const emit = defineEmits(['logout'])

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleLogout = () => {
  emit('logout')
  isDropdownOpen.value = false
}
</script>
