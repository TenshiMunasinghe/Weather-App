<script setup lang="ts">
  import { ref } from '@vue/reactivity'
  import useSWRV from 'swrv'
  import { onMounted } from 'vue'
  import CurrentWeather from './components/CurrentWeather.vue'
  import Days from './components/Days.vue'
  import LoadingSpinner from './components/LoadingSpinner.vue'
  import Weathers from './components/Weathers.vue'
  import type { components } from './schema'

  const location = ref<{ lat: number; lon: number } | null>(null)
  const { data } = useSWRV<components['schemas']['200'][]>(
    () =>
      location.value &&
      `/api/today?lat=${location.value.lat}&lon=${location.value.lon}`,
    async key => {
      const res = await fetch(key)

      return await res.json()
    }
  )

  onMounted(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        location.value = { lat: coords.latitude, lon: coords.longitude }
      },
      error => {
        console.error(error.message)
        location.value = { lat: 35.2, lon: 136.9 }
      }
    )
  })
</script>

<template>
  <div class="py-12 px-4 space-y-20 max-w-5xl mx-auto">
    <CurrentWeather v-if="location" :lat="location.lat" :lon="location.lon" />
    <Weathers :weathers="data" :label="'Today\'s Weather'" />
    <div class="space-y-3 text-lg">
      <h3>Week's Weather</h3>
      <Days v-if="location" :lat="location.lat" :lon="location.lon" />
      <LoadingSpinner v-else />
    </div>
  </div>
</template>
