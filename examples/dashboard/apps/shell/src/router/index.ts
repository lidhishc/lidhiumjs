import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHistory,
} from "vue-router";

import Home from "@/components/Home.vue";
import { loadRemoteComponentVue } from "@lidhium/common";

const LoginComponent = () =>
  loadRemoteComponentVue({
    importFn: () => import("auth/Login"),
    componentProps: {
      injectProps: {
        router,
      },
    },
  });

const LandingComponent = () =>
  loadRemoteComponentVue({
    importFn: () => import("landing_app/LandingPage"),
    componentProps: {
      injectProps: {
        router,
      },
    },
  });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (to.path === "/") {
          next("/auth");
        } else {
          next();
        }
      },
    },
    {
      path: "/auth",
      name: "auth",
      component: LoginComponent,
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: "/landing",
      name: "landing",
      component: LandingComponent,
    },
  ],
});

export default router;
