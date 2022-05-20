<script setup lang="ts">
  const url = new URL('../../spinner.svg', import.meta.url).href
</script>

<template>
  <img
    :src="url"
    alt="loading"
    class="absolute left-1/2 top-1/2 !m-0 -translate-x-1/2 -translate-y-1/2"
  />
</template>
