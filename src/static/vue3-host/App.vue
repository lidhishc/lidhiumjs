<script lang="ts">
const appName = process.env.APP_NAME;

export default {
  name: appName,
  data() {
    return {
      appName,
    };
  },
};
</script>

<template>
  <router-view />
</template>
