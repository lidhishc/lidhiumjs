<template>
  <div
    class="min-h-screen flex items-center justify-center bg-primary-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-primary-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              :value="email"
              @input="email = ($event.target as HTMLInputElement).value"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary-300 placeholder-primary-400 text-primary-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              :value="password"
              @input="password = ($event.target as HTMLInputElement).value"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary-300 placeholder-primary-400 text-primary-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-primary-300 rounded"
            />
            <label
              for="remember-me"
              class="ml-2 block text-sm text-primary-900"
            >
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-primary-600 hover:text-primary-700"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            @click="handleLogin"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, reactive, provide } from "vue";
import type { Router } from "vue-router";
import { useToast } from "@root/global/Toast";
const { success, error } = useToast();

import { loadRemoteComponentVue } from "@lidhium/common";
import type { DefineComponent } from "vue";

// Reactive refs for form inputs
const email = ref("");
const password = ref("");
const formHI = reactive({
  email: "",
  password: "",
});
const showLanding = ref(false);

// Inject the router with a default value to help with type inference
const componentProps = inject<Router>("remoteProps", null);
const router = componentProps?.router;
provide("router", router);

const handleLogin = (e?: Event) => {
  e?.preventDefault();
  if (email.value === "test@test.com" && password.value === "test") {
    console.log("Login successful");
    if (router) {
      success("Login successful");
      setTimeout(() => {
        router.push("/landing");
      }, 2000);
    } else {
      console.error("Router not available");
    }
  } else {
    error("Login failed - expected test@test.com/test");
    console.log("Login failed - expected test@test.com/test");
  }
};
</script>
