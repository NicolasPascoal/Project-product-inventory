<script setup>
import { ref, onMounted } from "vue";
import { api } from "../api/api";
import '../style.css'

const links = ref([]);
const products = ref([]);
const rawMaterials = ref([]);
const editingId = ref(null);

const form = ref({
  productId: "",
  rawMaterialId: "",
  quantity: ""
});

async function loadAll() {
  try {
    const [l, r, p] = await Promise.all([
  api.get("/product-raw-material"),
  api.get("/raw-materials"),
  api.get("/products")
]);
console.log("LINKS →", l.data);

links.value = l.data;
rawMaterials.value = r.data;
products.value = p.data;
  } catch (err) {
    console.error(err);
  }
}

async function handleSubmit() {
  try {
    if (editingId.value) {
      await api.put(`/product-raw-material/${editingId.value}`, form.value);
    } else {
      await api.post("/product-raw-material", form.value);
    }

    resetForm();
    loadAll();
  } catch (err) {
    console.error(err);
  }
}

function handleEdit(link) {
  editingId.value = link.id;

  form.value = {
    productId: link.product.id,
    rawMaterialId: link.rawMaterial.id,
    quantity: link.quantityRequired
  };
}

async function handleDelete(id) {
  const confirmed = window.confirm("Are you sure you want to delete this link?");
  if (!confirmed) return; 

  try {
    await api.delete(`/product-raw-material/${id}`);
    loadAll();
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting.");
  }
}

function resetForm() {
  editingId.value = null;
  form.value = {
    productId: "",
    rawMaterialId: "",
    quantity: ""
  };
}

onMounted(loadAll);
</script>

<template>
  <div class="max-w-6xl">

    <h1 class="text-2xl font-semibold mb-6">
      Product Composition
    </h1>

    <!-- FORM -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 flex flex-wrap gap-3">

      <select
        v-model="form.productId"
        class="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm"
      >
        <option value="">Select product</option>
        <option v-for="p in products" :key="p.id" :value="p.id">
          {{ p.name }}
        </option>
      </select>

      <select
        v-model="form.rawMaterialId"
        class="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm"
      >
        <option value="">Select material</option>
        <option v-for="r in rawMaterials" :key="r.id" :value="r.id">
          {{ r.name }}
        </option>
      </select>

      <input
        v-model="form.quantity"
        type="number"
        placeholder="Quantity used"
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

      <table class="w-full text-sm text-zinc-200" >

        <thead class="text-zinc-500">
          <tr>
            <th class="px-6 py-3 text-left">Product</th>
            <th class="px-6 py-3 text-left">Material</th>
            <th class="px-6 py-3 text-left">Quantity</th>
            <th class="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody class="text-zinc-200">
  <tr
    v-for="l in links"
    :key="l.id"
    class="border-t border-zinc-800 hover:bg-zinc-800/50"
  >
    <td class="px-6 py-4">{{ l.product.name }}</td>
    <td class="px-6 py-4">{{ l.rawMaterial.name }}</td>
    <td class="px-6 py-4">{{ l.quantityRequired }}</td>

    <td class="px-6 py-4 flex gap-2">
      <button
        @click="handleEdit(l)"
        class="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
      >
        Edit
      </button>

      <button
        @click="handleDelete(l.id)"
        class="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-sm"
      >
        Delete
      </button>
    </td>
  </tr>
</tbody>

      </table>
    </div>

  </div>
</template>