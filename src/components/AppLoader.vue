<template>
  <template v-if="!props.loading">
    <Suspense>
      <slot />
      <template #fallback>
        <AppLoading />
      </template>
    </Suspense>
  </template>

  <template v-else>
    <template v-if="props.loading">
      <AppLoading />
    </template>
    <template v-else>
      <slot />
    </template>
  </template>
</template>

<script setup lang="ts">
import AppLoading from "./AppLoading.vue"
export interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), { loading: false })
</script>

<style scoped></style>
