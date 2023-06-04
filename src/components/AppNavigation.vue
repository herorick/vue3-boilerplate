<template>
  <div class="flex container mx-auto justify-between py-5 px-5">
    <div class="">Nhat Nguyen</div>
    <div class="flex gap-4">
      <AppLink to="/" name="Home">Home</AppLink>

      <AppLink to="/login" name="SignIn">Sign in</AppLink>

      <AppLink to="/register" name="SignUp">Sign up</AppLink>
    </div>
  </div>
</template>

<script setup>
import AppLink from './AppLink.vue';

</script>

<style lang="scss" scoped></style>
