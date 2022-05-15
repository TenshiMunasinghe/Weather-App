<script setup lang="ts">
  import type { components } from '../schema'
  import LoadingSpinner from './LoadingSpinner.vue'
  import Weather from './Weather.vue'
  defineProps<{
    weathers: components['schemas']['200'][] | undefined
    label: string
  }>()
</script>

<template>
  <li class="flex flex-col space-y-3">
    <h3 class="text-lg">{{ label.replaceAll('-', '/') }}</h3>
    <ul
      v-if="weathers"
      class="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,6rem)] gap-3 lg:gap-6"
    >
      <Weather v-for="weather in weathers" :weather="weather" />
    </ul>
    <LoadingSpinner v-else />
  </li>
</template>
