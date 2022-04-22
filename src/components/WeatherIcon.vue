<script setup lang="ts">
  import {
    BIconCloud,
    BIconCloudDrizzle,
    BIconCloudDrizzleFill,
    BIconCloudFill,
    BIconCloudFog2,
    BIconCloudFog2Fill,
    BIconCloudLightning,
    BIconCloudLightningFill,
    BIconCloudRain,
    BIconCloudRainFill,
    BIconClouds,
    BIconCloudsFill,
    BIconCloudSun,
    BIconCloudSunFill,
    BIconSnow,
    BIconSun,
    BIconSunFill,
  } from 'bootstrap-icons-vue'
  defineProps<{
    iconId: string
  }>()
</script>

<template>
  <BIconSun v-if="iconId === '01n'" />
  <BIconSunFill v-else-if="iconId === '01d'" />
  <BIconCloudSun v-else-if="iconId === '02n'" />
  <BIconCloudSunFill v-else-if="iconId === '02d'" />
  <BIconCloud v-else-if="iconId === '03n'" />
  <BIconCloudFill v-else-if="iconId === '03d'" />
  <BIconClouds v-else-if="iconId === '04n'" />
  <BIconCloudsFill v-else-if="iconId === '04d'" />
  <BIconCloudDrizzle v-else-if="iconId === '09n'" />
  <BIconCloudDrizzleFill v-else-if="iconId === '09d'" />
  <BIconCloudRain v-else-if="iconId === '10n'" />
  <BIconCloudRainFill v-else-if="iconId === '10d'" />
  <BIconCloudLightning v-else-if="iconId === '11n'" />
  <BIconCloudLightningFill v-else-if="iconId === '11d'" />
  <BIconSnow v-else-if="iconId === '13n'" />
  <BIconSnow v-else-if="iconId === '13d'" />
  <BIconCloudFog2 v-else-if="iconId === '50n'" />
  <BIconCloudFog2Fill v-else-if="iconId === '50d'" />
</template>
