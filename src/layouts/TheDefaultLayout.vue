<template>
  <div>
    <AppNavigation />
    <AppBanner />
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
    name: "TheDefaultLayout",
    components: { AppBanner }
}
</script>

<script setup lang="ts">
import AppBanner from '@/components/AppBanner.vue';
import AppNavigation from '@/components/AppNavigation.vue'
</script>
