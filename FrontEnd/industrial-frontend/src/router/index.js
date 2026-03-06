import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/MainLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import Products from "../views/Products.vue";
import Link from "../views/Links.vue";
import RawMaterials from "../views/RawMaterials.vue";


const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "Dashboard", component: Dashboard },
      { path: "products", component: Products },
      { path: "raw-materials", component: RawMaterials },
      { path: "link", component: Link }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});