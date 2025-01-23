<template>
  <h1 class="text-3xl text-info text-center">Halaman Category</h1>
  <section class="my-3" v-show="inputAction">
    <h2 class="text-lg text-info">{{ isEdit ? "Edit" : "Tambah" }} Category</h2>
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
          <tr v-for="(item, key) in categoryStore.category" :key="item.id">
            <th>{{ key + 1 }}</th>
            <td>{{ item.name }}</td>
            <td class="flex gap-5">
              <input type="button" class="btn btn-primary btn-sm" value="Edit" @click="handleEdit(item)" />
              <input type="button" class="btn btn-error btn-sm" value="Delete" @click="handleDelete(item.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";

const categoryStore = useCategoryStore();
const nameCategory = ref("");
const inputAction = ref(false);
const isEdit = ref(false);
const id = ref(null);

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

const handleDelete = async (id) => {
  try {
    await categoryStore.deleteCategory(id);
    alert("Category deleted successfully.");
  } catch (error) {
    console.error("Error deleting category:", error);
  } finally {
    clearInputForm();
    closeForm();
  }
};

const actionCategory = async () => {
  try {
    if (isEdit.value) {
      await categoryStore.updateCategory(id.value, { name: nameCategory.value });
      alert("Category updated successfully.");
    } else {
      await categoryStore.addCategory({ name: nameCategory.value });
      alert("Category added successfully.");
    }
  } catch (error) {
    console.error("Error in actionCategory:", error);
  } finally {
    clearInputForm();
    closeForm();
  }
};

onMounted(() => {
  categoryStore.getCategory();
});
</script>
