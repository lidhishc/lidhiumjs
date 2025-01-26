import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import AB from "../views/AboutView23.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/about",
    name: "about",
    component: AB,
  },
];

// async function getRemoteRoutes(): Promise<RouteRecordRaw[]> {
//   const remoteModule = await import("remoteApp/routes" as any);
//   console.log(remoteModule.routes);
//   return remoteModule.routes || [];
// }

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// getRemoteRoutes().then((remoteRoutes) => {
//   remoteRoutes.forEach((route) => {
//     router.addRoute(route);
//     if (router.currentRoute.value.path === route.path) {
//       router.replace(route.path);
//     }
//   });
// });
export default router;
