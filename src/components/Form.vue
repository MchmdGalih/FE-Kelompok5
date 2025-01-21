<template>
  <form class="card-body w-1/2" @submit.prevent="onSubmit">
    <div class="form-control" v-if="isRegister">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        type="text"
        placeholder="username"
        class="input input-bordered"
        required
        v-model="formData.name"
      />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        type="email"
        placeholder="email"
        class="input input-bordered"
        required
        v-model="formData.email"
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder="password"
        class="input input-bordered"
        required
        v-model="formData.password"
      />
    </div>

    <div class="form-control" v-if="isRegister">
      <label class="label">
        <span class="label-text">Password Confirmation</span>
      </label>
      <input
        type="password"
        placeholder="password"
        class="input input-bordered"
        required
        v-model="formData.password_confirmation"
      />
    </div>
    <p>
      {{ isRegister ? "sudah punya akun?" : "belum punya akun?" }}
      <RouterLink :to="isRegister ? '/login' : '/register'">{{
        isRegister ? "Login" : "Register"
      }}</RouterLink>
    </p>

    <div class="form-control mt-6">
      <button class="btn btn-primary" type="submit" :disabled="loading">
        {{ isRegister ? "Register" : "Login" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { authStore } from "@/stores/auth";
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();

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
    onReset();
  } else {
    await auth.login(formData);
    onReset();
  }
};
</script>
