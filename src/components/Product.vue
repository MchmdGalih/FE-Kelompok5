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
          <span class="label-text">Genre</span>
        </div>
        <select class="select select-bordered" v-model="data.category_id">
          <option disabled selected></option>
          <option v-for="item in category" :key="item.id" :value="item.id">
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
  import { useAuthStore } from "@/stores/auth";
  
  const authStore = useAuthStore();
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
    description: "",
    category_id: "",
    price: "",
    image: null,
    stock: "",
  });

  const category = ref([]);
  const getCategory = async () => {
    const { data } = await apiClient.get("/category");
    category.value = data.data;  
  };
  
  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    data.image = selectedImage;

    // console.log(e);
  };
  const handleSubmit = async () => {
    if (!data.name || !data.description || !data.category_id || !data.price || !data.stock) {
      alert("Please fill all the required fields.");
      return;
    }

    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category_id", data.category_id);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
  
    if (data.image) {
      formData.append("image", data.image);
    }
  
    if (props.isEdit) {
      await apiClient.post(`/product/${data.id}?_method=put`, formData, {
        headers: { Authorization: `Bearer ${authStore.tokenUser}` },
      });
    } else {
      await apiClient.post("/product", formData, {
        headers: { Authorization: `Bearer ${authStore.tokenUser}` },
      });
    }
    router.push("/product");
  };
  onMounted(() => {
    getCategory();
  
    if (props.dataUpdate) {
      data.name = props.dataUpdate.name;
      data.description = props.dataUpdate.description;
      data.price = props.dataUpdate.price;
      data.category_id = props.dataUpdate.category_id;
      data.stock = props.dataUpdate.stock;
    }
  });

</script>