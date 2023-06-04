<template>
  <div class="w-[800px] mx-auto">
    <h1 class="text-center text-2xl font-bold my-8">Setting Page</h1>
    <form class="flex flex-col gap-6" @submit.prevent="updateSetting">
      <AppInput
        type="text"
        id="settings-url"
        v-model="form.image"
        placeholder="URL of profile picture"
      />

      <AppInput
        type="text"
        id="settings-username"
        v-model="form.username"
        placeholder="Your name"
      />

      <AppInput
        type="text"
        id="settings-bio"
        v-model="form.bio"
        placeholder="Your bio"
      />

      <AppInput
        type="password"
        id="settings-password"
        v-model="form.password"
        placeholder="New Password"
      />
      <AppButton type="submit">Update</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import { useUserStore } from '@/stores/user'
import type { UpdateUser } from '@/types/user'
import { reactive, onMounted } from 'vue'
import { routerPush } from '@/router'
import { api } from '@/services'

const form: UpdateUser = reactive({
  image: '',
  username: '',
  bio: '',
  email: '',
  password: ''
})

const userStore = useUserStore()

onMounted(async () => {
  if (!userStore.isAuthorized) return await routerPush('login')

  form.image = userStore.user?.image
  form.username = userStore.user?.username
  form.bio = userStore.user?.bio
  form.email = userStore.user?.email
})

const updateSetting = async () => {
  const filteredForm = Object.entries(form).reduce(
    (a, [k, v]) => (v === null ? a : { ...a, [k]: v }),
    {}
  )
  const userData = await api.user
    .updateCurrentUser({ user: filteredForm })
    .then((res) => res.data.user)
  userStore.updateUser(userData)
  // await routerPush('profile', { username: userData.username })
}
</script>

<style lang="scss" scoped></style>
