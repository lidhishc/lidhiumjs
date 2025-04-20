<template>
  <div class="min-h-screen bg-primary-50 text-primary-900">
    <!-- Header -->
    <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-700">Welcome Back 👋</h1>

      <!-- Dropdown Container -->
      <div ref="dropdownRef" class="relative">
        <!-- Toggle Button -->

        <button
          @click="toggleDropdown"
          class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition"
        >
          Settings!
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-40 bg-white border border-primary-100 rounded shadow-lg z-50"
        >
          <ul>
            <li>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-primary-700 hover:bg-primary-50"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="p-6 space-y-6">
      <!-- Stat Cards -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded shadow p-4">
          <h2 class="text-sm text-primary-600 mb-1">Users</h2>
          <p class="text-2xl font-bold">1,245</p>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h2 class="text-sm text-primary-600 mb-1">Revenue</h2>
          <p class="text-2xl font-bold">$23,430</p>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h2 class="text-sm text-primary-600 mb-1">New Orders</h2>
          <p class="text-2xl font-bold">320</p>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h2 class="text-sm text-primary-600 mb-1">Support Tickets</h2>
          <p class="text-2xl font-bold">58</p>
        </div>
      </section>

      <!-- Charts -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Line Chart -->
        <div class="bg-white rounded shadow p-4">
          <h3 class="text-lg font-semibold text-primary-700 mb-2">
            User Growth {{ dropdownOpen }}
          </h3>
          <svg
            class="w-full h-48 text-primary-300"
            viewBox="0 0 500 100"
            fill="none"
          >
            <path
              d="M 0 80 Q 50 60, 100 70 T 200 40 T 300 50 T 400 30 T 500 45"
              stroke="currentColor"
              stroke-width="3"
              fill="none"
            />
          </svg>
        </div>

        <!-- Bar Chart -->
        <div class="bg-white rounded shadow p-4">
          <h3 class="text-lg font-semibold text-primary-700 mb-2">
            Monthly Sales
          </h3>
          <div class="flex items-end h-48 gap-2">
            <div class="bg-primary-300 w-6 h-1/4"></div>
            <div class="bg-primary-400 w-6 h-1/2"></div>
            <div class="bg-primary-500 w-6 h-2/3"></div>
            <div class="bg-primary-600 w-6 h-1/3"></div>
            <div class="bg-primary-400 w-6 h-3/4"></div>
            <div class="bg-primary-500 w-6 h-1/2"></div>
            <div class="bg-primary-600 w-6 h-2/5"></div>
          </div>
        </div>
      </section>
      <component :is="ChartComponent" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, provide, inject } from "vue";
import { useToast } from "@root/global/Toast";
import { loadRemoteComponentVue } from "@lidhium/common";
import type { DefineComponent } from "vue";

const { success, error } = useToast();

const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const componentProps = inject<Router>("remoteProps", null);
const router = componentProps?.router;

provide("router", router);

const ChartComponent = ref<DefineComponent | null>(null);

onMounted(async () => {
  try {
    const component = await loadRemoteComponentVue({
      importFn: () => import("charts/Chart"),
      componentProps: {
        injectProps: { router },
        forcedLoadingTime: 4000,
      },
    });
    ChartComponent.value = component;
  } catch (err) {
    console.error("Failed to load landing component:", err);
  }
});

const toggleDropdown = (event: MouseEvent) => {
  event.stopPropagation();
  dropdownOpen.value = !dropdownOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

const logout = () => {
  //   alert("Logging out...");
  success("Logging out...");
  setTimeout(() => {
    router.push("/auth");
  }, 2000);
  dropdownOpen.value = false;
};
</script>
