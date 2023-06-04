<template>
  <div>
    <h1 class="text-center text-2xl mb-5">Sign Up</h1>
    <form class="flex flex-col gap-2" @submit.prevent="register">
      <AppInput
        id="register-username"
        title="Your Name"
        placeholder="Your Name"
        type="text"
        v-model="form.username"
      />
      <AppInput
        id="register-email"
        title="Your Email"
        placeholder="Your Email"
        type="text"
        v-model="form.email"
      />
      <AppInput
        type="password"
        id="register-password"
        title="Password"
        placeholder="Your Password"
        v-model="form.password"
      />
      <AppButton
        class="w-fit"
        variant="light"
        type="submit"
        :disabled="!form.email || !form.password"
        >Sign In</AppButton
      >
    </form>
    <ul class="error-messages">
      <li v-for="(error, field) in errors" :key="field">
        {{ field }} {{ error ? error[0] : '' }}
      </li>
    </ul>

    <AppLink name="register" to="login"> have already an account? </AppLink>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppLink from '@/components/AppLink.vue'
import { api } from '@/services'
import { isFetchError } from '@/services'
import { ref, reactive } from 'vue'

const errors = ref()
const form = reactive({
  username: '',
  email: '',
  password: ''
})

const register = async () => {
  errors.value = {}

  try {
    const result = await api.users.createUser({ user: form })
    updateUser(result.data.user)
    await routerPush('global-feed')
  } catch (e) {
    if (isFetchError(e)) {
      errors.value = e.error?.errors
    }
  }
}
</script>

<style lang="scss" scoped></style>
