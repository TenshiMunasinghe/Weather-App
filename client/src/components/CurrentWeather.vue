<script setup lang="ts">
  import { computed, toRef } from '@vue/reactivity'
  import useSWRV from 'swrv'
  import type { Location } from '../App.vue'
  import type { components } from '../schema'
  import { getTime } from '../utils/getTime'
  import Info from './Info.vue'
  import LoadingSpinner from './LoadingSpinner.vue'
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

  const props = defineProps<{ location?: Location }>()
  const location = toRef(props, 'location')
  const { data, isValidating } = useSWRV<components['schemas']['200']>(
    () =>
      location.value
        ? `/api/current?lat=${location.value.lat}&lon=${location.value.lon}`
        : null,
    async key => {
      const res = await fetch(key)
      return await res.json()
    }
  )

  const weather = computed(() => data.value?.weather?.[0])
</script>

<template>
  <section
    class="space-y-8 relative"
    :class="{ 'min-h-[20rem]': !data && isValidating }"
  >
    <template v-if="data">
      <header>
        <h1 class="text-4xl">{{ data.name }}, {{ data.sys?.country }}</h1>
        <div>
          {{ WEEKDAY[date.getDay()] }} {{ date.getDate() }}
          {{ MONTHS[date.getMonth()] }}
        </div>
      </header>
      <div class="grid md:grid-cols-2 gap-6 items-center">
        <div
          v-if="weather"
          class="grid grid-cols-2 gap-x-6 justify-items-center border-b-2 md:border-b-0 md:border-r-2 md:pb-0 md:pr-6 border-zinc-200/20 pb-6"
        >
          <WeatherIcon class="w-full h-full mr-auto" :icon-id="weather.icon" />
          <div class="space-y-4 w-min h-full">
            <div
              v-if="!!data.main?.temp"
              class="w-min text-[length:min(18vw,5rem)]"
            >
              {{ Math.round(data.main.temp) }}&#x2103;
            </div>
            <div class="text-lg capitalize">{{ weather.description }}</div>
          </div>
        </div>
        <div class="grid gap-6 grid-cols-3 grid-rows-2">
          <Info
            v-if="!!data.main?.temp_max"
            :main="`${Math.round(data.main.temp_max)}&#x2103;`"
            :sub="'high'"
          />
          <Info
            v-if="!!data.wind?.speed"
            :main="`${data.wind.speed}mph`"
            :sub="'wind'"
          />
          <Info
            v-if="!!data.sys?.sunrise"
            :main="getTime(data.sys.sunrise)"
            :sub="'sunrise'"
          />
          <Info
            v-if="!!data.main?.temp_min"
            :main="`${Math.round(data.main.temp_min)}&#x2103;`"
            :sub="'low'"
          />
          <Info
            v-if="!!data.main?.humidity"
            :main="`${data.main.humidity}%`"
            :sub="'humidity'"
          />
          <Info
            v-if="!!data.sys?.sunset"
            :main="getTime(data.sys.sunset)"
            :sub="'sunset'"
          />
        </div>
      </div>
    </template>
    <LoadingSpinner v-if="isValidating" />
  </section>
</template>
