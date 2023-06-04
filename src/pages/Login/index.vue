<template>
  <div>
    <h1 class="text-center text-2xl font-bold mb-4">Sign In</h1>
    <form class="flex flex-col gap-4" @submit.prevent="login">
      <AppInput
        type="email"
        id="login-email"
        title="Email"
        v-model="form.email"
      />
      <AppInput
        type="password"
        id="login-password"
        title="Password"
        v-model="form.password"
      />
      <AppButton variant="light" type="submit" :disabled="!form.email || !form.password">Sign In</AppButton>
    </form>
    <ul class="error-messages">
      <li v-for="(error, field) in errors" :key="field">
        {{ field }} {{ error ? error[0] : '' }}
      </li>
    </ul>

    <AppLink class="mt-3" name="register"> Need an account? </AppLink>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppLink from '@/components/AppLink.vue';
import { api } from '@/services';
import { isFetchError } from '@/services';
import { ref, reactive } from 'vue'

const errors = ref()
const form = reactive({
  email: '',
  password: ''
})

const login = async () => {
  errors.value = {}
  try {
    const result = await api.users.login({ user: form })
    updateUser(result.data.user)
    await routerPush('global-feed')
  } catch (e) {
    if (isFetchError(e)) {
      errors.value = e.error?.errors
      return
    }
    console.error(e)
  }
}
</script>

<style lang="scss" scoped></style>
