<template>
      <header class="flex justify-between items-center p-6 bg-opacity-50 relative z-20">
        <div class="text-white text-2xl font-serif font-bold ">TokoKita</div>
        <!-- untuk mobile toggle button-->
         <div class="md:hidden z-30">
         <button type="button" class="block focus:outline-none" @click="isMenuOpen = !isMenuOpen">
            <span v-if="isMenuOpen" class="text-5xl"> 
                <img src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png"  alt="close" width="50" height="50">
            </span>
            <span v-else class="text-5xl">
                <img src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png" alt="menu" width="50" height="50">
            </span>
         </button>
        </div>
         <!-- Navbar Link-->
          <nav :class="['fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:relative md:bg-transparent md:flex md:justify-between md:pr-4 md:flex-row',
            isMenuOpen ? 'block' : 'hidden'
          ]">
           <ul class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0 font-mono">
               <li v-for="item in menu" :key="item.id">
      <router-link
        :to="item.url"
        class="block text-white transition hover:text-primary ease-linear text-2xl md:text-lg "
        @click="scrollToSection(item.url)"
      >
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</nav>
</header>
  </template>
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'


const menu = [
    {id:1, name: 'Home', url:'/'},
    {id:2, name:'Product', url:'/product'},
    {id:3, name: 'Category', url: '/category'},
    {id:4, name: 'Contact', url: '/contact'}

];
const isMenuOpen = ref (false);
const scrollToSection = (url)=> {
isMenuOpen.value = false;
    elementRef.value.scrollIntoView({ behavior:'smooth' });
  }

</script>
 
