<script setup lang="ts">
  import Weather from './Weather.vue'
  defineProps<{
    weathers: any
    label: string
  }>()
</script>

<template>
  <li class="flex flex-col space-y-3">
    <h3 class="text-lg">{{ label.replaceAll('-', '/') }}</h3>
    <ul
      class="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,6rem)] gap-3 lg:gap-6"
    >
      <Weather v-for="weather in weathers" :weather="weather" />
    </ul>
  </li>
</template>
