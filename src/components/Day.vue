<script setup lang="ts">
  import Weather from './Weather.vue'
  defineProps<{
    weathers: any[]
    label: string
  }>()
</script>

<template>
  <li class="flex flex-col space-y-3">
    <h3 class="text-lg">{{ label.replaceAll('-', '/') }}</h3>
    <ul class="grid grid-cols-4 gap-3">
      <Weather v-for="weather in weathers" :weather="weather" />
    </ul>
  </li>
</template>
