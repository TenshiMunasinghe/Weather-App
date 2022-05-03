<script setup lang="ts">
  import { computed } from '@vue/reactivity'
  import useSWRV from 'swrv'
  import { watch } from 'vue'
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

  watch([data], () => console.log(data.value))
</script>

<template>
  <section class="space-y-8" v-if="data">
    <header>
      <h1 class="text-4xl">{{ data.name }}, {{ data.sys.country }}</h1>
      <div>
        {{ WEEKDAY[date.getDay()] }} {{ date.getDate() }}
        {{ MONTHS[date.getMonth()] }}
      </div>
    </header>
    <div class="flex flex-col space-y-8">
      <div
        class="grid grid-cols-2 gap-x-6 place-items-center border-b-2 border-zinc-200/20 pb-6"
      >
        <WeatherIcon class="w-full h-full" :icon-id="weather.icon" />
        <div class="space-y-4 w-full h-full">
          <div class="w-full text-[length:18vw]">
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
        <Info :main="`${data.main.humidity}%`" :sub="'humidity'" />
        <Info
          :main="`${kelvinsToCelsius(data.main.temp_min)}&#x2103;`"
          :sub="'low'"
        />
        <Info :main="`${data.wind.gust}mph`" :sub="'gust'" />
        <Info :main="`${data.main.pressure}hpa`" :sub="'pressure'" />
      </div>
    </div>
  </section>
  <div v-else>Loading...</div>
</template>
