<script setup lang="ts">
  import { computed } from '@vue/reactivity'
  import type { Daily } from './Days.vue'
  import Info from './Info.vue'
  import WeatherIcon from './WeatherIcon.vue'

  const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const { day } = defineProps<{ day: Daily }>()

  const date = computed(() => day.dt && new Date(day.dt * 1000))
</script>
<template>
  <div
    v-if="day"
    class="grid grid-cols-3 grid-rows-2 gap-3 bg-blue-900/40 py-4"
  >
    <Info
      v-if="date"
      :main="WEEKDAY[date.getDay()]"
      :sub="`${date.getMonth() + 1}/${date.getDate()}`"
      :align="'center'"
    />
    <Info
      :main="`${Math.round(day.temp.min)}&#x2103;`"
      :sub="'Low'"
      :align="'center'"
    />
    <Info
      :main="`${Math.round(day.temp.max)}&#x2103;`"
      :sub="'High'"
      :align="'center'"
    />
    <WeatherIcon class="w-14 h-14 mx-auto" :icon-id="day.weather[0].icon" />
    <Info
      :main="`${Math.round(day.pop * 100)}%`"
      :sub="'Rain'"
      :align="'center'"
    />
    <Info
      :main="`${Math.round(day.wind_speed)}mph`"
      :sub="'Wind'"
      :align="'center'"
    />
  </div>
</template>
