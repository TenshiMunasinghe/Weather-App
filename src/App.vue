<script setup lang="ts">
  import { computed, ref } from '@vue/reactivity'
  import _ from 'lodash'
  import useSWRV from 'swrv'
  import { onMounted } from 'vue'
  import CurrentWeather from './components/CurrentWeather.vue'
  import Day from './components/Day.vue'

  const location = ref<{ lat: number; lon: number } | null>(null)
  const { data, error } = useSWRV(
    () =>
      location.value &&
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        location.value.lat
      }&lon=${location.value.lon}&appid=${import.meta.env.VITE_API_KEY}`,
    async key => {
      return await (await fetch(key)).json()
    }
  )

  const days = computed(() => {
    const formattedData = data.value?.list.map((weather: any) => ({
      ...weather,
      date: weather.dt_txt.split(' ')[0],
      time: weather.dt_txt.split(' ')[1],
    }))

    const groupedData = _.groupBy(formattedData, 'date')

    const sortedData = Object.entries(groupedData).map(([key, value]) => [
      key,
      value.sort((a, b) => a.dt - b.dt),
    ])

    return Object.fromEntries(sortedData)
  })

  onMounted(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        location.value = { lat: coords.latitude, lon: coords.longitude }
      },
      error => {
        console.error(error.message)
        location.value = { lat: 35.2, lon: 136.9 }
      }
    )
  })
</script>

<template>
  <div class="py-12 px-4 space-y-20">
    <CurrentWeather v-if="location" :lat="location.lat" :lon="location.lon" />
    <ul v-if="!!Object.keys(days)?.length" class="space-y-12 max-w-7xl mx-auto">
      <Day
        v-for="(weathers, key) in days"
        :weathers="weathers"
        :key="key.toString()"
        :label="key.toString()"
      />
    </ul>
    <div v-else>Loading...</div>
  </div>
</template>
