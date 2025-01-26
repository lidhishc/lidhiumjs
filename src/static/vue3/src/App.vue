<script lang="ts">
import { defineAsyncComponent } from "vue";
const Auth = defineAsyncComponent(
  () => import("authentication/Auth" as string),
);

export default {
  name: "App-Host",
  components: {
    Auth,
  },
  computed: {},
  methods: {},
};
</script>

<template>
  <div>
    <div id="sadsad">From HOST</div>
    <div>
      <Auth />
    </div>
  </div>
</template>
