<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="flex min-h-screen bg-zinc-950 text-zinc-100">

    <!-- SIDEBAR -->
    <aside class="w-[220px] bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">

      <h2 class="text-lg font-semibold mb-8">Factory</h2>

      <nav class="flex flex-col gap-4 text-sm">

        <RouterLink
          to="/Dashboard"
          class="px-4 py-2.5 rounded-xl text-sm text-zinc-400
        
         hover:border-zinc-700 hover:text-white hover:bg-zinc-800/40
         transition-all duration-200"
          active-class="text-white border-zinc-700 bg-zinc-800/60"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          to="/products"
          class="px-4 py-2.5 rounded-xl text-sm text-zinc-400
   
         hover:border-zinc-700 hover:text-white hover:bg-zinc-800/40
         transition-all duration-200"
  active-class="text-white border-zinc-700 bg-zinc-800/60"
        >
          Products
        </RouterLink>

        <RouterLink
          to="/raw-materials"
          class="px-4 py-2.5 rounded-xl text-sm text-zinc-400
    
         hover:border-zinc-700 hover:text-white hover:bg-zinc-800/40
         transition-all duration-200"
  active-class="text-white border-zinc-700 bg-zinc-800/60"
        >
          Raw Materials
        </RouterLink>

        <RouterLink
          to="/link"
          class="px-4 py-2.5 rounded-xl text-sm text-zinc-400

         hover:border-zinc-700 hover:text-white hover:bg-zinc-800/40
         transition-all duration-200"
  active-class="text-white border-zinc-700 bg-zinc-800/60"
        >
          Link
        </RouterLink>

      </nav>
    </aside>

    <!-- CONTENT -->
    <main class="flex-1 p-8">
      <RouterView />
    </main>

  </div>
</template>