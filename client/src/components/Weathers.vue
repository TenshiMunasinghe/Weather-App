<script setup lang="ts">
  import useSWRV from 'swrv'
  import { toRef } from 'vue'
  import type { Location } from '../App.vue'
  import type { components } from '../schema'
  import LoadingSpinner from './LoadingSpinner.vue'
  import Weather from './Weather.vue'
  const props = defineProps<{
    location?: Location
  }>()
  const location = toRef(props, 'location')
  const { data, isValidating } = useSWRV<components['schemas']['200'][]>(
    () =>
      location.value
        ? `/api/today?lat=${location.value.lat}&lon=${location.value.lon}`
        : null,
    async key => {
      const res = await fetch(key)
      const json = await res.json()

      return json
    }
  )
</script>

<template>
  <ul
    class="grid relative grid-cols-4 md:grid-cols-[repeat(auto-fit,6rem)] gap-3 lg:gap-6"
    :class="{ 'min-h-[20rem]': !data && isValidating }"
  >
    <Weather v-if="data" v-for="weather in data" :weather="weather" />
    <LoadingSpinner v-if="isValidating" />
  </ul>
</template>
