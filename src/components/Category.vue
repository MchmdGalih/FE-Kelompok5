<template>

    <h1 class="text-3xl text-info text-center">Halaman Category</h1>
    <section class="my-3" v-show="inputAction">
        <h2 class="text-lg text-info">{{ isEdit ? "Edit" : "Tambah" }} category</h2>
        <form @submit.prevent="actionCategory">
            <input 
                type="text" 
                placeholder="Masukan nama category" 
                class="input input-bordered w-full mt-2" 
                v-model="nameCategory"
            />
            <div class="flex gap-5">
                <button class="btn btn-primary btn-block mt-3">
                    {{ isEdit ? "Edit" : "Tambah" }}
                </button>
                <button class="btn btn-error btn-block mt-3" type="button" @click="closeForm">
                    Cancel
                </button>
            </div>
        </form>
    </section>
    <section>
        <div class="overflow-x-auto">
            <div class="flex justify-between">
                <h2 class="text-lg font-bold text-info my-5 p-5">Tampil Category</h2>
                
                <button @click="tambahForm" class="btn btn-error btn-sm mr-4 px-4 py-2 mt-8 rounded-xl">
                    <!-- <v-icon name="fa-plus-circle" scale="3" fill="blue" /> -->
                    Add
                </button>
            </div>
      <table class="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in categoryData" :key="item.id">
            <th>{{ key + 1 }}</th>
            <td>{{ item.name }}</td>
            <td class="flex gap-5">
              <input
                type="button"
                class="btn btn-primary btn-sm"
                value="Edit"
                @click="handleEdit(item)"
              />
              <input
                type="button"
                class="btn btn-error btn-sm"
                value="Delete"
                @click="handleDelete(item.id)"
              />
              <!-- <input 
                                type="button" 
                                class="btn btn-error btn-sm" 
                                value="Add" 
                                @click="tambahForm(item.id)"
                            /> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { apiClient } from "../config/api";
import { onMounted, ref } from "vue";

const nameCategory = ref("");
const inputAction = ref(false);
const categoryData = ref([]);
const isEdit = ref(false);
const id = ref(null);

const handleDelete = async (id) => {
  try {
    const deleteCategory = await apiClient.post(
      `/category/${id}?_method=DELETE`
    );
    alert(deleteCategory.data.message);
    await fetchCategory();
  } catch (error) {
    console.error("Error deleting category:", error);
  } finally {
    clearInputForm();
    closeForm();
  }
};

const clearInputForm = () => {
  nameCategory.value = "";
  isEdit.value = false;
  id.value = null;
};

const tambahForm = () => {
  clearInputForm();
  inputAction.value = true;
};

const handleEdit = (item) => {
  inputAction.value = true;
  isEdit.value = true;
  id.value = item.id;
  nameCategory.value = item.name;
};

const closeForm = () => {
  inputAction.value = false;
};

const fetchCategory = async () => {
  try {
    const { data } = await apiClient.get("/category");
    categoryData.value = data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const actionCategory = async () => {
  try {
    if (isEdit.value) {
      // edit
      const updateCategory = await apiClient.post(
        `/category/${id.value}?_method=PUT`,
        {
          name: nameCategory.value,
        }
      );
      alert(updateCategory.data.message);
    } else {
      // create
      const newCategory = await apiClient.post("/category", {
        name: nameCategory.value,
      });
      alert(newCategory.data.message);
    }
    await fetchCategory();
  } catch (error) {
    console.error("Error in actionCategory:", error);
  } finally {
    clearInputForm();
    closeForm();
  }
};

onMounted(() => {
  fetchCategory();
});
</script>

