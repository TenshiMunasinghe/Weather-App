<script setup lang="ts">
  const className = {
    center: 'text-center',
    left: 'text-start',
    right: 'text-end',
  }
  const { align = 'left' } = defineProps<{
    main: string
    sub: string
    align?: 'center' | 'left' | 'right'
  }>()
</script>

<template>
  <div class="space-y-2">
    <div class="text-xl" :class="className[align]">{{ main }}</div>
    <div class="font-extralight capitalize" :class="className[align]">
      {{ sub }}
    </div>
  </div>
</template>
