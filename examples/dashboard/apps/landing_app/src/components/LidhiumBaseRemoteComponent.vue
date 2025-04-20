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
  <div>
    <h1>Lidhium Remote App : {{ appName }}</h1>
  </div>
</template>
