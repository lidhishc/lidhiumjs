<template>
  <div class="app">
    <MicroFrontendGraph />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MicroFrontendGraph from "./views/MicroFrontendGraph.vue";

export default defineComponent({
  name: "App",
  setup() {
    return {};
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
