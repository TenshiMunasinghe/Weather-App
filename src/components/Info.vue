<script setup lang="ts">
  const props = defineProps<{ main: string; sub: string }>()
</script>

<template>
  <div class="space-y-2">
    <div class="text-xl">{{ props.main }}</div>
    <div class="font-extralight capitalize">{{ props.sub }}</div>
  </div>
</template>
