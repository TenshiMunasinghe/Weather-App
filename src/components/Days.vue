<script setup lang="ts">
  import useSWRV from 'swrv'
  import { toRef } from 'vue'
  import type { Location } from '../App.vue'
  import Day from './Day.vue'
  import LoadingSpinner from './LoadingSpinner.vue'
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

  const props = defineProps<{ location?: Location }>()
  const location = toRef(props, 'location')
  const { data, isValidating } = useSWRV<{ daily: Daily[] }>(() =>
    location.value
      ? `/api/week?lat=${location.value.lat}&lon=${location.value.lon}`
      : null
  )
</script>

<template>
  <div
    class="flex flex-col space-y-6 relative"
    :class="{ 'min-h-[20rem]': !data && isValidating }"
  >
    <Day v-if="data" v-for="day of data?.daily" :day="day" />
    <LoadingSpinner v-if="isValidating" />
  </div>
</template>
