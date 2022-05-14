<script setup lang="ts">
  import useSWRV from 'swrv'
  import Day from './Day.vue'
  export interface Daily {
    clouds: number
    dew_point: number
    dt: number
    feels_like: { day: number; night: number; eve: number; morn: number }
    humidity: number
    moon_phase: number
    moonrise: number
    moonset: number
    pop: number
    pressure: number
    sunrise: number
    sunset: number
    temp: {
      day: number
      eve: number
      max: number
      min: number
      morn: number
      night: number
    }
    uvi: number
    weather: { description: string; icon: string; id: number; main: string }[]
    wind_deg: number
    wind_gust: number
    wind_speed: number
  }

  const { lat, lon } = defineProps<{ lat: number; lon: number }>()
  const { data } = useSWRV<{ daily: Daily[] }>(
    `/api/week?lat=${lat}&lon=${lon}`
  )
</script>

<template>
  <div v-if="data" class="flex flex-col space-y-6">
    <Day v-for="day of data?.daily" :day="day" />
  </div>
</template>
