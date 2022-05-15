<script setup lang="ts">
  import { toRef } from 'vue'
  import type { components } from '../schema'
  import LoadingSpinner from './LoadingSpinner.vue'
  import Weather from './Weather.vue'
  const props = defineProps<{
    weathers?: components['schemas']['200'][]
    label: string
  }>()
  const data = toRef(props, 'weathers')
</script>

<template>
  <li class="flex flex-col space-y-3">
    <h3 class="text-lg">{{ label.replaceAll('-', '/') }}</h3>
    <ul
      v-if="data"
      class="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,6rem)] gap-3 lg:gap-6"
    >
      <Weather v-for="weather in data" :weather="weather" />
    </ul>
    <LoadingSpinner v-else />
  </li>
</template>
