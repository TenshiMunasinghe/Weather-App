<script setup lang="ts">
  import { ref } from '@vue/reactivity'
  import useSWRV from 'swrv'
  import { onMounted, watch } from 'vue'

  const location = ref<{ lat: number; lon: number } | null>(null) // location of Nagoya
  const { data, error } = useSWRV(
    () =>
      location.value &&
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        location.value.lat
      }&lon=${location.value.lon}&appid=${import.meta.env.VITE_API_KEY}`,
    async key => {
      return await (await fetch(key)).json()
    }
  )

  watch([data], () => {
    console.log(data.value.weather || 'loading')
  })

  onMounted(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        location.value = { lat: coords.latitude, lon: coords.longitude }
      },
      error => (location.value = { lat: 35.2, lon: 136.9 })
    )
  })
</script>

<template>
  <div class="py-12 px-24">
    <ul v-if="data">
      <li v-for="weather in data.weather">
        <h3>{{ weather.main }}</h3>
        <p>{{ weather.description }}</p>
        <img :src="`http://openweathermap.org/img/w/${weather.icon}.png`" />
      </li>
    </ul>
    <div v-else>Loading...</div>
  </div>
</template>
