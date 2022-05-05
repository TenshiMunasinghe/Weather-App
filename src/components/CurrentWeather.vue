<script setup lang="ts">
  import { computed } from '@vue/reactivity'
  import useSWRV from 'swrv'
  import { getTime } from '../utils/getTime'
  import { kelvinsToCelsius } from '../utils/kelvinsToCelsius'
  import Info from './Info.vue'
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
</script>

<template>
  <section class="space-y-8 max-w-6xl mx-auto" v-if="data">
    <header>
      <h1 class="text-4xl">{{ data.name }}, {{ data.sys.country }}</h1>
      <div>
        {{ WEEKDAY[date.getDay()] }} {{ date.getDate() }}
        {{ MONTHS[date.getMonth()] }}
      </div>
    </header>
    <div class="grid md:grid-cols-2 gap-6 items-center">
      <div
        class="grid grid-cols-2 gap-x-6 justify-items-center border-b-2 md:border-b-0 md:border-r-2 md:pb-0 md:pr-6 border-zinc-200/20 pb-6"
      >
        <WeatherIcon class="w-full h-full mr-auto" :icon-id="weather.icon" />
        <div class="space-y-4 w-min h-full">
          <div class="w-min text-[length:min(18vw,5rem)]">
            {{ kelvinsToCelsius(data.main.temp) }}&#x2103;
          </div>
          <div class="text-lg capitalize">{{ weather.description }}</div>
        </div>
      </div>
      <div class="grid gap-6 grid-cols-3 grid-rows-2">
        <Info
          :main="`${kelvinsToCelsius(data.main.temp_max)}&#x2103;`"
          :sub="'high'"
        />
        <Info :main="`${data.wind.speed}mph`" :sub="'wind'" />
        <Info :main="getTime(data.sys.sunrise)" :sub="'sunrise'" />
        <Info
          :main="`${kelvinsToCelsius(data.main.temp_min)}&#x2103;`"
          :sub="'low'"
        />
        <Info :main="`${data.main.humidity}%`" :sub="'humidity'" />
        <Info :main="getTime(data.sys.sunset)" :sub="'sunset'" />
      </div>
    </div>
  </section>
  <div v-else>Loading...</div>
</template>
