<template>
  <div class="h-screen pa-sm-4 pa-2 d-flex align-center justify-center bg-blue-lighten-1">
    <v-card color="white" class="flex-grow-1 pa-sm-7 pa-4" max-width="500" elevation="4">
      <v-card-title class="px-0 text-center text-h5 mb-4"> Ошибка </v-card-title>
      <v-card-text class="px-0">
        <v-alert type="info">
          <p class="text-h6">
            Только староста группы имеет доступ к данной странице, войдите как
            староста и повторите попытку
          </p>
        </v-alert>
      </v-card-text>
      <v-card-actions class="px-0">
        <nuxt-link class="d-block flex-grow-1" to="/">
          <v-btn block variant="flat" color="indigo">На главную</v-btn>
        </nuxt-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
});
</script>

<style scoped></style>
