<template>
  <div>
    <label v-if="title" :for="props.id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
      props.title
    }}</label>
    <input
      :id="props.id"
      :type="props.type"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="props.placeholder"
      :required="props.required"
      v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  type: 'text' | "password" | "email"
  required?: boolean
  placeholder?: string
  modelValue?: any
  title?: string
  id: string
}

export interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: any) {
    emit('update:modelValue', value)
  }
})
</script>

<style lang="scss" scoped></style>
