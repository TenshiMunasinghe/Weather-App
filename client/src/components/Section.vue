<script setup lang="ts">
  defineProps<{ heading: string }>()
</script>

<template>
  <div class="flex flex-col space-y-3">
    <h3 class="text-lg">{{ heading }}</h3>
    <slot></slot>
  </div>
</template>
