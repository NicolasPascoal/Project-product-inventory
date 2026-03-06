<script setup>
import { ref, onMounted } from "vue";
import { api } from "../api/api";
import "../style.css";

const rawMaterials = ref([]);
const loading = ref(false);
const editingId = ref(null);

const form = ref({
  name: "",
  quantity: ""
});

async function loadRawMaterials() {
  try {
    loading.value = true;
    const res = await api.get("/raw-materials");
    rawMaterials.value = res.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  try {
    if (editingId.value) {
      await api.put(`/raw-materials/${editingId.value}`, form.value);
    } else {
      await api.post("/raw-materials", form.value);
    }

    resetForm();
    loadRawMaterials();
  } catch (err) {
    console.error(err);
  }
}

function handleEdit(material) {
  editingId.value = material.id;
  form.value = {
    name: material.name,
    quantity: material.quantity
  };
}

async function handleDelete(id) {
  const confirmed = window.confirm("Are you sure you want to delete this material?");
  if (!confirmed) return;

  try {
    await api.delete(`/raw-materials/${id}`);
    loadRawMaterials();
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting.");
  }
}

function resetForm() {
  editingId.value = null;
  form.value = {
    name: "",
    quantity: ""
  };
}

onMounted(loadRawMaterials);
</script>

<template>
  <div class="max-w-6xl">

    <h1 class="text-2xl font-semibold mb-6">
      Raw Materials
    </h1>

    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 flex flex-wrap gap-3">

      <input
        v-model="form.name"
        placeholder="Material name"
        class="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm"
      />

      <input
        v-model="form.quantity"
        type="number"
        placeholder="Quantity"
        class="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm w-40"
      />

      <button
        @click="handleSubmit"
        class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-medium"
      >
        {{ editingId ? "Update" : "Create" }}
      </button>

      <button
        v-if="editingId"
        @click="resetForm"
        class="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
      >
        Cancel
      </button>

    </div>

    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

      <table v-if="!loading" class="w-full text-sm text-zinc-200">

        <thead class="text-zinc-500">
          <tr>
            <th class="px-6 py-3 text-left">Name</th>
            <th class="px-6 py-3 text-left">Quantity</th>
            <th class="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="material in rawMaterials"
            :key="material.id"
            class="border-t border-zinc-800 hover:bg-zinc-800/50"
          >
            <td class="px-6 py-4">{{ material.name }}</td>
            <td class="px-6 py-4">{{ material.quantity }}</td>

            <td class="px-6 py-4 flex gap-2">
              <button
                @click="handleEdit(material)"
                class="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
              >
                Edit
              </button>

              <button
                @click="handleDelete(material.id)"
                class="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>

      </table>

      <p v-if="loading" class="p-6 text-zinc-400">
        Loading...
      </p>

    </div>

  </div>
</template>