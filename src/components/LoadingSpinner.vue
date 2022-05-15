<script setup lang="ts">
  const url = new URL('../../spinner.svg', import.meta.url).href
</script>

<template>
  <img :src="url" alt="loading" class="mx-auto" />
</template>
