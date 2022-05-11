<script setup lang="ts">
  import type { components } from '../schema'
  import WeatherIcon from './WeatherIcon.vue'
  defineProps<{ weather: components['schemas']['200'] }>()
</script>

<template>
  <li
    class="bg-blue-900/40 rounded py-4 px-6 whitespace-nowrap flex flex-col space-y-2 md:space-y-3 justify-center items-center"
  >
    <h4>{{ weather.dt_txt?.split(' ')[1].substr(0, 5) }}</h4>
    <WeatherIcon class="w-9 h-9" :icon-id="weather.weather[0].icon" />
    <div v-if="typeof weather.main.temp === 'number'">
      {{ Math.round(weather.main.temp) }}&#x2103;
    </div>
  </li>
</template>
