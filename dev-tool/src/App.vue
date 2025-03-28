<template>
  <div class="app">
    <MicroFrontendGraph />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import MicroFrontendGraph from "./views/MicroFrontendGraph.vue";
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
    const error = ref("");

    const fetchConfig = async () => {
      try {
        console.log("Fetching config from:", "/api/lidhium-config");
        const response = await fetch("/api/lidhium-config");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received config:", data);

        config.value = data;
        projectName.value = data.project;
      } catch (error) {
        console.error("Failed to fetch lidhium config:", error);
      }
    };

    // onMounted(() => {
    //   fetchConfig();
    // });

    return {
      config,
      projectName,
      error,
    };
  },
  components: {
    MicroFrontendGraph,
  },
});
</script>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  color: #2c3e50;
}

h2 {
  color: #42b983;
  margin-top: 20px;
}

.error {
  color: red;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid red;
  border-radius: 4px;
}
</style>
