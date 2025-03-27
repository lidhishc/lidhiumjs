<template>
  <div class="app">
    <h1>{{ projectName }}</h1>
    <div v-if="config">
      <p>Webapp Type: {{ config.webapp }}</p>
      <p>Bundler: {{ config.bundler }}</p>
      <div v-for="(app, name) in config.apps" :key="name">
        <h2>{{ name }} App</h2>
        <p>Port: {{ app.port }}</p>
        <p>Type: {{ app.appType }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

interface LidhiumConfig {
  project: string;
  webapp: string;
  bundler: string;
  apps: {
    [key: string]: {
      port: string;
      appType: string;
      remotes: string[];
      exposedComponents: Record<string, any>;
      url: string;
    };
  };
}

export default defineComponent({
  name: "App",
  setup() {
    const config = ref<LidhiumConfig | null>(null);
    const projectName = ref("");

    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/lidhium-config");
        const data = await response.json();
        config.value = data;
        projectName.value = data.project;
      } catch (error) {
        console.error("Failed to fetch lidhium config:", error);
      }
    };

    onMounted(() => {
      fetchConfig();
    });

    return {
      config,
      projectName,
    };
  },
});
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
}

h2 {
  color: #42b983;
  margin-top: 20px;
}
</style>
