<template>
  <div class="h-100">
    <v-row class="login-row overflow-auto" no-gutters>
      <v-col cols="6" class="d-flex align-center justify-center pa-2">
        <v-card color="#24221F" class="flex-grow-1 pa-6" max-width="512">
          <v-card-actions>
            <v-form @submit.prevent="" class="w-75 mx-auto py-6">
              <h2 class="text-white mb-12">
                <v-icon icon="mdi-exit-run" class="yellow-text pr-2" /> Авторизация
                студента
              </h2>
              <v-row> </v-row>
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6" class="h-screen">
        <v-img
          :src="config.public.images + '/Login/Content.jpg'"
          max-height="100%"
          height="100%"
          min-height="300px"
          cover
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
});
const config = useRuntimeConfig();



</script>

<style lang="scss" scoped>
@import "~/assets/scss/auth.scss";

</style>
