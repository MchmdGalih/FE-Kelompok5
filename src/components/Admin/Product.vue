<template>
<form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <label class="form-control w-full">
       <div class="label">
        <span class="label-text">Image </span>
    </div>
     <input
      type="file"
      class="file-input w-full max-w-xs"
      @change="handleImage"
    />
</label>
    <label class="form-control w-full">
    <div class="label">
        <span> Name</span>
    </div>
<input 
type="text"
placeholder="type here"
class="input input-bordered w-full"
v-model="data.name"
>
</label>
<label class="form-control w-full">
 <div class="label">
  <span class="label-text">description</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="data.description"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">price</span>
        </div>
        <input
          type="number"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="data.price"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">stock</span>
        </div>
        <input
          type="number"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="data.stock"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Category</span>
        </div>
        <select class="select select-bordered" v-model="data.category_id">
          <option disabled selected></option>
          <option v-for="item in category.category" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </label>
      <button class="btn btn-primary btn-block mt-5" type="submit">
        {{ props.isEdit ? "Update" : "Add" }}
        </button>
    </form>
</template>
<script setup>
import { apiClient } from "@/config/api";
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "@/stores/auth";
import { useCategoryStore } from "@/stores/category";
import { useProductsStore } from "@/stores/product";

const beAuthStore = authStore();
const category = useCategoryStore();
const product = useProductsStore();
const router = useRouter();

const props = defineProps({
 isEdit: {
   type: Boolean,
   default: false,
 },
 dataUpdate: {
   type: Object,
   default: null,
 },
});

const data = reactive({
 name: "",
 price: "",
 description: "",
 image: null,
 stock: "",
 category_id: "",
});

// Handler untuk mengambil data kategori
const getCategory = async () => {
 try {
   const res = await category.getCategory();
   console.log('Categories loaded:', res);
 } catch (error) {
   console.error('Failed to load categories:', error);
   alert('Error loading categories: ' + error.message);
 }
};

// Handler untuk memproses file gambar
const handleImage = (e) => {
 try {
   const selectedImage = e.target.files[0];
   if (selectedImage) {
     // Validasi ukuran file (max 5MB)
     if (selectedImage.size > 5 * 1024 * 1024) {
       alert('Image harus dibawah 5MB');
       e.target.value = '';
       return;
     }
     
     // Validasi tipe file
     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
     if (!allowedTypes.includes(selectedImage.type)) {
       alert('Please select a valid image file (JPEG, PNG, or GIF)');
       e.target.value = '';
       return;
     }
     
     data.image = selectedImage;
     console.log('Image processed successfully:', selectedImage.name);
   }
 } catch (error) {
   console.error('Image processing error:', error);
   alert('Failed to process image');
   e.target.value = '';
 }
};

// Handler untuk validasi input
const validateInput = () => {
 if (!data.name?.trim()) {
   alert('Product name is required');
   return false;
 }
 if (!data.description?.trim()) {
   alert('Product description is required');
   return false;
 }
 if (!data.category_id) {
   alert('Category is required');
   return false;
 }
 if (!data.price || isNaN(Number(data.price)) || Number(data.price) <= 0) {
   alert('Please enter a valid price');
   return false;
 }
 if (!data.stock || isNaN(parseInt(data.stock)) || parseInt(data.stock) < 0) {
   alert('Please enter a valid stock quantity');
   return false;
 }
 return true;
};

// Handler untuk submit form
const handleSubmit = async () => {
 try {
   if (!validateInput()) return;

   const formData = new FormData();
   formData.append("name", String(data.name).trim());
   formData.append("price", Number(data.price));
   formData.append("description", String(data.description).trim());
   formData.append("category_id", parseInt(data.category_id));
   formData.append("stock", parseInt(data.stock));
   if (data.image) {
     formData.append("image", data.image);
   }

   for (let pair of formData.entries()) {
     console.log('Form data:', pair[0] + ': ' + pair[1]);
   }

   let response;
   if (props.isEdit) {
     response = await apiClient.post(`/product/${data.id}?_method=put`, formData, {
       headers: { 'Content-Type': 'multipart/form-data' }
     });
     alert("Product updated successfully");
   } else {
    response = await apiClient.post('/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
     console.log('Product added:', response);
     alert("Product added successfully");
   }
   
   router.push("/product");
 } catch (error) {
   console.error('Form submission error:', error);
   
   if (error.response?.data?.errors) {
     const errorMessages = Object.values(error.response.data.errors)
       .flat()
       .join('\n');
     alert(errorMessages);
   } else {
     alert(error.response?.data?.message || 'Error processing your request');
   }
 }
};

// Handler untuk inisialisasi data
const initializeData = () => {
 try {
   if (props.dataUpdate) {
     data.name = props.dataUpdate.name;
     data.description = props.dataUpdate.description;
     data.price = props.dataUpdate.price;
     data.category_id = props.dataUpdate.category_id;
     data.stock = props.dataUpdate.stock;
     console.log('Data initialized for editing');
   }
 } catch (error) {
   console.error('Data initialization error:', error);
   alert('Error initializing form data');
 }
};

onMounted(() => {
 getCategory();
 initializeData();
});
</script>