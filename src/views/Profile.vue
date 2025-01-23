<template>
  <Default>
    <section class="w-full">
      <div class="p-10 flex flex-col">
        <div class="avatar mx-auto">
          <div
            class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2"
          >
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="mt-4 w-9/12 flex flex-col gap-2 mx-auto"
        >
          <div class="mb-1">
            <label class="block text-xl font-bold mb-2">Age</label>
            <input
              type="number"
              placeholder="Type here"
              class="input input-bordered w-full bg-white border-blue-400 mb-2"
              v-model="payload.age"
            />
          </div>
          <div class="mb-2">
            <label class="block text-xl font-bold mb-2">Bio</label>
            <textarea
              v-model="payload.bio"
              placeholder="Type here"
              class="textarea bg-white border-blue-400 w-full"
            ></textarea>
          </div>
          <div class="mb-2">
            <input
              type="file"
              class="file-input file-input-ghost bg-white border-black w-full"
              @onchange="handleUploadFile"
            />
          </div>

          <div class="w-full text-center" v-if="isLoading">
            <p>Loading....</p>
          </div>
        </form>
      </div>
    </section>
  </Default>
</template>

<script setup>
import Default from "@/layouts/Default.vue";
import { authStore } from "@/stores/auth";
import { reactive, ref } from "vue";

const isLoading = ref(false);
const store = authStore();
const user = store.currentUser;

const payload = reactive({
  id: "",
  age: "",
  bio: "",
  image: null,
});



</script>
