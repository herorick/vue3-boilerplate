<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheAuthLayout'
})
</script>

<template>
  <div class="relative w-full h-screen">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <slot></slot>
    </div>
  </div>
</template>
