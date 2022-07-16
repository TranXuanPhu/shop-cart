import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    name: "products",
    path: "/products",
    component: () => import("../views/Products.vue"),
    // children: [
    //   {
    //     path: "/products/new",
    //     component: () => import("../components/product/NewProduct.vue"),
    //   },
    // ],
  },
  {
    name: "ProductDetail",
    path: "/products/:id",
    component: () => import("../components/product/ProductDetail.vue"),
  },
  {
    name: "new_product",
    path: "/products/new",
    component: () => import("../components/product/NewProduct.vue"),
  },
  {
    name: "Cart",
    path: "/cart",
    component: () => import("../views/Cart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
