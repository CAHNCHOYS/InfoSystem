<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400&display=swap");

@import "~/assets/scss/global.scss";

.page-enter-active,
.page-leave-active {
  transition: all 0.45s;
}
.page-enter-from,
.page-leave-to {
  transform: translate(-15%, 0);
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.45s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
