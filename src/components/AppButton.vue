<template>
  <button
    type="button"
    :class="[
      {
        'cursor-not-allowed opacity-80': isDisabled,
        'px-3 py-2': isSmall,
        'px-5 py-2.5': isMedium,
        'px-5 py-3': isLarge,
        'text-white focus:ring-blue-300 bg-blue-700 hover:bg-blue-800': isDefaultVariant,
        'text-white focus:ring-yellow-300 dark:focus:ring-yellow-900 bg-yellow-400 hover:bg-yellow-500':
          isYellowVariant,
        'text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800':
          isGreenVariant,
        'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900':
          isRedVariant,
        'text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700':
          isDarkVariant,
        ' bg-white border border-gray-300 hover:bg-gray-100  focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-gray-900':
          isLightVariant
      },
      props.class
    ]"
    class="focus:ring-4 font-medium rounded-lg text-sm mr-2 mb-2 focus:outline-none"
    :disabled="isDisabled"
  >
    <slot />
    <LoadingIcon v-if="loading" />
  </button>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'

import LoadingIcon from '@/components/icons/IconLoading.vue'
export interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'dark' | 'light' | 'green' | 'red' | 'yellow'
  class?: string
  disabled?: boolean
  loading?: boolean
}

export interface Emits {}

const props = withDefaults(defineProps<Props>(), { size: 'md', variant: 'default' })

const { size, loading } = toRefs(props)

const isDisabled = computed(() => props.disabled)
const variant = computed(() => props.variant)

const isSmall = size?.value === 'sm'
const isMedium = size?.value === 'md'
const isLarge = size?.value === 'lg'

const isRedVariant = variant.value === 'red'
const isDarkVariant = variant.value === 'dark'
const isLightVariant = variant.value === 'light'
const isGreenVariant = variant.value === 'green'
const isYellowVariant = variant.value === 'yellow'
const isDefaultVariant = variant.value === 'default'
</script>
