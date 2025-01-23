<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55"
  >
    <div class="bg-white py-6 px-8 rounded shadow-lg w-96 relative">
      <button
        class="absolute top-2 right-1 text-2xl text-black rounded-full font-bold"
        @click="closeModal"
      >
        X
      </button>
      <figure>
        <img class="w-full h-48 object-cover rounded" :src="dataProps.image" />
      </figure>
      <h2 class="text-lg font-bold">{{ dataProps.name }}</h2>
      <p>{{ dataProps.description }}</p>
      <div class="flex justify-between">
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
        <div class="form-control">
          <label class="label">
            <span class="label-text">Address</span>
          </label>
          <input
            type="text"
            placeholder="first name"
            class="input input-bordered"
            v-model="data.address"
          />
        </div>

        <select
          class="select select-bordered select-xs w-full max-w-xs"
          v-model="data.quantity"
        >
          <option v-for="stock in dataProps.stock" :key="stock">
            {{ stock }}
          </option>
        </select>
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
  address: "",
  quantity: 1,
  total_price: "",
});

const emit = defineEmits(["close-modal", "kirim-data"]);
const closeModal = () => {
  emit("close-modal");
};

const order = () => {
  emit("kirim-data", {
    product_id: props.dataProps.id,
    first_name: data.first_name,
    last_name: data.last_name,
    address: data.address,
    quantity: data.quantity,
    total_price: props.dataProps.price * data.quantity,
  });
  console.log("-->", data.quantity);
};
</script>
