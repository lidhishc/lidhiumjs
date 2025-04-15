<template>
  <div
    class="flex flex-col items-center justify-center min-h-[200px] p-4 text-center"
  >
    <div class="text-red-500 mb-4">Failed to load component</div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["retry"]);
</script>
