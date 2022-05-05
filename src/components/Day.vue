<script setup lang="ts">
  import { kelvinsToCelsius } from '../utils/kelvinsToCelsius'
  import WeatherIcon from './WeatherIcon.vue'
  defineProps<{
    weathers: any[]
    label: string
  }>()
</script>

<template>
  <li class="flex flex-col space-y-3">
    <h3 class="text-lg">{{ label.replaceAll('-', '/') }}</h3>
    <ul class="flex overflow-x-auto space-x-3">
      <li
        v-for="weather in weathers"
        class="bg-blue-900/50 rounded-sm py-4 px-6 whitespace-nowrap flex flex-col space-y-2 justify-center items-center"
      >
        <h4>{{ weather.time.substr(0, 5) }}</h4>
        <WeatherIcon class="w-9 h-9" :icon-id="weather.weather[0].icon" />
        <div v-if="typeof weather.main.temp === 'number'">
          {{ kelvinsToCelsius(weather.main.temp) }}&#x2103;
        </div>
      </li>
    </ul>
  </li>
</template>
