import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/admin/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/admin/login",
      name: "login",
      component: () => import("@/components/Login.vue"),
    },
    {
      path: "/admin/list",
      name: "list",
      component: () => import("@/components/ProductList.vue"),
    },
    {
      path: "/product/detail/:id",
      name: "detail",
      component: () => import("@/views/DetailView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404Page",
      component: () => import("@/components/404Page.vue"),
    },
  ],
});

export default router;
