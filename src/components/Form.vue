<template>
  <form
    class="card-body w-1/2 shadow-lg border border-gray-300 rounded-md text-black"
    @submit.prevent="onSubmit"
  >
    <div class="form-control" v-if="isRegister">
      <label class="label">
        <span class="label-text text-black">Name</span>
      </label>
      <input
        type="text"
        placeholder="username"
        class="input input-bordered bg-white text-black"
        v-model="formData.name"
      />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text text-black">Email</span>
      </label>
      <input
        type="email"
        placeholder="email"
        class="input input-bordered bg-white text-black"
        v-model="formData.email"
      />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text text-black">Password</span>
      </label>
      <input
        type="password"
        placeholder="password"
        class="input input-bordered bg-white text-black"
        v-model="formData.password"
      />
    </div>

    <div class="form-control" v-if="isRegister">
      <label class="label">
        <span class="label-text bg-white text-black"
          >Password Confirmation</span
        >
      </label>
      <input
        type="password"
        placeholder="password"
        class="input border border-blue-400 bg-white text-black"
        v-model="formData.password_confirmation"
      />
    </div>
    <p>
      {{ isRegister ? "sudah punya akun?" : "belum punya akun?" }}
      <RouterLink
        :to="isRegister ? '/login' : '/register'"
        class="text-blue-500"
        >{{ isRegister ? "Login" : "Register" }}</RouterLink
      >
    </p>

    <div class="form-control mt-6">
      <button
        class="btn btn-primary text-white font-bold"
        type="submit"
        :disabled="loading"
      >
        {{ isRegister ? "Register" : "Login" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { authStore } from "@/stores/auth";
import { reactive, ref } from "vue";

const alertType = ref(null);
const alertMsg = ref(null);

const auth = authStore();
const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false,
  },
});

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const onReset = () => {
  formData.name = "";
  formData.email = "";
  formData.password = "";
  formData.password_confirmation = "";
};

const onSubmit = async () => {
  if (props.isRegister) {
    await auth.register(formData);
    alertType.value = "success";
    alertMsg.value = "Berhasil Register";

    setTimeout(() => {
      alertMsg.value = "";
      alertType.value = "";
    }, 1000);
  } else {
    await auth.login(formData);
    alertType.value = "success";
    alertMsg.value = "Berhasil Login";

    setTimeout(() => {
      alertMsg.value = "";
      alertType.value = "";
    }, 1000);
  }
};
</script>
