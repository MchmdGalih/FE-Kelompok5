<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55"
  >
    <div class="bg-white p-6 rounded shadow-lg w-96 relative">
      <button
        class="absolute top-2 right-2 text-red-500 rounded-md"
        @click="closeModal"
      >
        X
      </button>
      <figure class="mb-4">
        <img class="object-cover h-40 w-full rounded" :src="dataProps.image" />
      </figure>
      <h2 class="text-lg font-bold mb-2">{{ dataProps.name }}</h2>
      <div class="flex justify-between">
        <p>{{ dataProps.description }}</p>
        <p>{{ formatter.format(dataProps.price) }}</p>
      </div>
      <form @submit.prevent="order" class="w-full p-2 rounded">
        <div class="form-control">
          <label class="label">
            <span class="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="first name"
            class="input input-bordered"
            v-model="data.first_name"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="first name"
            class="input input-bordered"
            v-model="data.last_name"
          />
        </div>

        <div class="form-control w-full mt-2">
          <button class="btn btn-primary">Order</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { formatter } from "@/utils/formatted";
import { required } from "@vuelidate/validators";
import { reactive } from "vue";

const props = defineProps({
  dataProps: {
    type: Object,
    default: required,
  },
});

const data = reactive({
  first_name: "",
  last_name: "",
});

const emit = defineEmits(["close-modal", "kirim-data"]);
const closeModal = () => {
  emit("close-modal");
};

const order = () => {
  emit("kirim-data", [data, false]);
};
</script>
