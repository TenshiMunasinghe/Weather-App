<script setup lang="ts">
  import useSWRV from 'swrv'
  import { kelvinsToCelsius } from '../utils/kelvinsToCelsius'
  import WeatherIcon from './WeatherIcon.vue'

  const { lat, lon } = defineProps<{ lat: number; lon: number }>()
  const { data } = useSWRV(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  )
</script>

<template>
  <section v-if="data">
    <h1 class="text-2xl">{{ data.name }}, {{ data.sys.country }}</h1>
    <div class="grid grid-cols-2 gap-x-2 place-items-center">
      <WeatherIcon class="w-full h-full" :icon-id="data.weather[0].icon" />
      <div class="space-y-4 w-full h-full">
        <div class="w-full h-full text-center text-[length:18vw]">
          {{ kelvinsToCelsius(data.main.temp) }}&#x2103;
        </div>
      </div>
    </div>
  </section>
  <div v-else>Loading...</div>
</template>
