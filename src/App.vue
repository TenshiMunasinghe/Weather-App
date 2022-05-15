<script setup lang="ts">
  import { computed, ref } from '@vue/reactivity'
  import { BIconSearch } from 'bootstrap-icons-vue'
  import useSWRV from 'swrv'
  import { onMounted } from 'vue'
  import CurrentWeather from './components/CurrentWeather.vue'
  import Days from './components/Days.vue'
  import Weathers from './components/Weathers.vue'

  export interface Location {
    lat: number
    lon: number
  }

  const locationName = ref(null)

  const defaultLocation = ref<Location>()

  const { data: location } = useSWRV<Location>(
    () => locationName.value && `/api/location?name=${locationName.value}`,
    async key => {
      const res = await fetch(key)
      const json = await res.json()
      const { lat, lon } = json[0]
      return { lat, lon }
    }
  )

  const activeLocation = computed(() =>
    locationName.value ? location.value : defaultLocation.value
  )

  onMounted(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        defaultLocation.value = { lat: coords.latitude, lon: coords.longitude }
      },
      error => {
        console.error(error.message)
        defaultLocation.value = { lat: 35.2, lon: 136.9 }
      }
    )
  })

  const onSubmit = async (e: any) => {
    locationName.value = e.target.elements.locationName.value
  }
</script>

<template>
  <div class="py-12 px-4 space-y-20 max-w-5xl mx-auto flex flex-col">
    <form
      @submit.prevent="onSubmit($event)"
      class="inline-flex mx-auto max-w-full rounded overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500"
    >
      <input
        placeholder="Search City"
        name="locationName"
        class="bg-blue-600 p-3 group-focus-within:outline-none w-96 placeholder:text-zinc-300 placeholder:text-sm placeholder:font-extralight"
      />
      <button type="submit" class="bg-blue-700 p-3 px-4 hover:bg-blue-500">
        <BIconSearch />
      </button>
    </form>
    <CurrentWeather :location="activeLocation" />
    <div class="flex flex-col space-y-3">
      <h3 class="text-lg">Today's Weather</h3>
      <Weathers :location="activeLocation" />
    </div>
    <div class="space-y-3 text-lg">
      <h3>Week's Weather</h3>
      <Days :location="activeLocation" />
    </div>
  </div>
</template>
