<script setup>
import { ref, onMounted } from "vue";
import { api } from "../api/api";



const data = ref(null);
const loading = ref(false);

const totalProducts = ref(0);
const totalRawMaterials = ref(0);
const lowStockProducts = ref([]);
const producibleProducts = ref(0);


async function loadProduction() {
  try {
    loading.value = true;

    const res = await api.get("/production/suggested");
    data.value = res.data;

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function loadMetrics() {
  try {
    const p = await api.get("/dashboard/total-products");
    totalProducts.value = p.data.total;

    const r = await api.get("/dashboard/total-raw-materials");
    totalRawMaterials.value = r.data.total;

    const pp = await api.get("/dashboard/total-producible-products");
    producibleProducts.value = pp.data.total;

    const low = await api.get("/dashboard/low-stock-products");
    lowStockProducts.value = low.data;

  } catch (err) {
    console.error("Metrics error", err);
  }
}


onMounted(() => {
  loadProduction();
  loadMetrics();
});
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">


    <div class="border-b border-zinc-800">
      <div class="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-semibold">Production</h1>
          <p class="text-sm text-zinc-400">Production planning overview</p>
        </div>

        <button
          @click="loadProduction"
          class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition font-medium"
        >
          Refresh
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">


      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p class="text-sm text-zinc-400">Total Products</p>
          <p class="text-3xl font-semibold mt-1">{{ totalProducts }}</p>
        </div>

        <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p class="text-sm text-zinc-400">Raw Materials</p>
          <p class="text-3xl font-semibold mt-1">{{ totalRawMaterials }}</p>
        </div>

        <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p class="text-sm text-zinc-400">Producible</p>
          <p class="text-3xl font-semibold text-emerald-400 mt-1">{{ producibleProducts }}</p>
        </div>

        <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p class="text-sm text-zinc-400">Low Stock</p>
          <p class="text-3xl font-semibold text-orange-400 mt-1">{{ lowStockProducts.length }}</p>
        </div>

      </div>


      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl">

        <div class="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 class="font-semibold">Production Plan</h2>

          <div class="text-sm text-zinc-400">
            Total:
            <span class="font-semibold text-zinc-100">
              R$ {{ data?.totalValue ?? 0 }}
            </span>
          </div>
        </div>

        <table class="w-full">
          <thead class="text-left text-sm text-zinc-500">
            <tr>
              <th class="px-6 py-3">Product</th>
              <th class="px-6 py-3">Quantity</th>
              <th class="px-6 py-3">Value</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in data?.productionPlan"
              :key="index"
              class="border-t border-zinc-800 hover:bg-zinc-800/50"
            >
              <td class="px-6 py-4 font-medium">
                {{ item.product }}
              </td>

              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded-md bg-zinc-800 text-sm">
                  {{ item.quantity }}
                </span>
              </td>

              <td class="px-6 py-4 font-medium text-emerald-400">
                R$ {{ item.totalValue }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>