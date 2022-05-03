<script setup lang="ts">
  import { computed } from '@vue/reactivity'
  import useSWRV from 'swrv'
  import { watch } from 'vue'
  import { kelvinsToCelsius } from '../utils/kelvinsToCelsius'
  import WeatherIcon from './WeatherIcon.vue'

  const WEEKDAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const date = new Date()

  const { lat, lon } = defineProps<{ lat: number; lon: number }>()
  const { data } = useSWRV(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  )

  const weather = computed(() => data.value.weather[0])

  watch([data], () => console.log(data.value))
</script>

<template>
  <section class="space-y-8" v-if="data">
    <div>
      <h1 class="text-4xl">{{ data.name }}, {{ data.sys.country }}</h1>
      <div>
        {{ WEEKDAY[date.getDay()] }} {{ date.getDate() }}
        {{ MONTHS[date.getMonth()] }}
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-6 place-items-center">
      <WeatherIcon class="w-full h-full" :icon-id="weather.icon" />
      <div class="space-y-4 w-full h-full">
        <div class="w-full text-[length:18vw]">
          {{ kelvinsToCelsius(data.main.temp) }}&#x2103;
        </div>
        <div class="text-lg capitalize">{{ weather.description }}</div>
      </div>
    </div>
  </section>
  <div v-else>Loading...</div>
</template>
