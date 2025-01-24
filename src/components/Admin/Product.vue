<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <input type="hidden" v-model="data.id" />

    <label class="form-control w-full">
      <span class="label-text">Image</span>
      <input type="file" class="file-input w-full max-w-xs" @change="handleImage" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Name</span>
      <input type="text" class="input input-bordered w-full" v-model="data.name" placeholder="Enter name" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Description</span>
      <input type="text" class="input input-bordered w-full" v-model="data.description" placeholder="Enter description" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Price</span>
      <input type="number" class="input input-bordered w-full" v-model="data.price" placeholder="Enter price" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Stock</span>
      <input type="number" class="input input-bordered w-full" v-model="data.stock" placeholder="Enter stock" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Category</span>
      <select class="select select-bordered" v-model="data.category_id">
        <option disabled selected value="">Select category</option>
        <option v-for="item in categoryList" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
    </label>

    <div class="flex gap-4 mt-5">
      <!-- Button Add -->
      <button class="btn btn-primary flex-1" type="submit">
        {{ isEdit ? "Update" : "Add" }}
      </button>
    </div>
    <div class="flex gap-4 mt-5">
      <button type="button" class="btn btn-warning flex-1" @click="handleEdit">Edit</button>
      <button type="button" class="btn btn-error flex-1" @click="handleDelete">Delete</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/category";
import { apiClient } from "@/config/api";
import { authStore } from "@/stores/auth";

const router = useRouter();
const categoryStore = useCategoryStore();
const categoryList = ref([]);
const store = authStore

const props = defineProps({
  isEdit: Boolean,
  dataUpdate: Object,
});

const data = reactive({
  id: "",
  name: "",
  description: "",
  price: "",
  stock: "",
  category_id: "",
  image: null,
});

const loadCategories = async () => {
  try {
    categoryList.value = await categoryStore.getCategory();
  } catch (error) {
    alert("Failed to load categories: " + error.message);
  }
};

const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) return alert("Image must be under 5MB");
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type))
      return alert("Invalid file type");
    data.image = file;
  }
};

const validateInput = () => {
  if (!data.name || !data.description || !data.category_id || !data.price || !data.stock) {
    alert("All fields are required");
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (!validateInput()) return;
  const formData = new FormData();
  Object.keys(data).forEach((key) => data[key] && formData.append(key, data[key]));

  try {
    const endpoint = props.isEdit ? `/product/${data.id}?_method=put` : "/product";
    await apiClient.post(endpoint, formData, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${store.token}` } });
    alert(props.isEdit ? "Product berhasil di update" : "Product berhasil dibuat");
    router.push("/dashboard/product");
  } catch (error) {
    alert(error.response?.data?.message || "An error occurred");
  }
};

const handleEdit = () => {
  // Logika untuk edit bisa disesuaikan
  alert("Edit button clicked! Implement edit disini.");
};

const handleDelete = async () => {
  if (!confirm("Apakah kamu yakin ingin menghapus")) return;
  try {
    await apiClient.delete(`/product/${data.id}`, {
  headers: {
    Authorization: `Bearer ${store.token}`
  }
});
    alert("Product berhasil di hapus");
    router.push("/dashboard/product");
  } catch (error) {
    alert(error.response?.data?.message || "An error occurred");
  }
};

onMounted(() => {
  loadCategories();
  if (props.dataUpdate) Object.assign(data, props.dataUpdate);
});
</script>