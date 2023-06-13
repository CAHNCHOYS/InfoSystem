<template>
  <div
    class="h-screen overflow-auto bg-blue d-flex justify-center align-center"
  >
    <v-card class="flex-grow-1 pa-6" max-width="450" elevation="5">
      <v-card-title class="text-center px-0 py-0 text-h5 text-wrap mb-5">
        Выберете вариант входа
      </v-card-title>

      <v-alert
        type="warning"
        variant="flat"
        class="mb-5"
        v-if="route.query.isLoginRequired"
      >
        <p class="text-h6">
          Для доступа к странице {{ route.query.redirectedFrom }} необходимо
          авторизироваться!
        </p>
      </v-alert>

      <v-card-actions class="px-0">
        <v-row no-gutters>
          <v-col cols="12" class="mb-4">
            <nuxt-link
              :to="{
                path: '/auth/login/starosta',
                query: {
                  redirectedFrom: route.query.redirectedFrom,
                },
              }"
              class="d-block"
            >
              <v-btn block variant="flat" color="indigo">
                Войти как староста
              </v-btn>
            </nuxt-link>
          </v-col>
          <v-col cols="12" class="mb-4">
            <nuxt-link
              :to="{
                path: '/auth/login/student',
                query: {
                  redirectedFrom: route.query.redirectedFrom,
                },
              }"
              class="d-block"
            >
              <v-btn block variant="flat" color="green">
                Войти как студент
              </v-btn>
            </nuxt-link>
          </v-col>
          <v-col cols="12">
            <nuxt-link to="/" class="d-block">
              <v-btn block variant="flat" color="blue-grey"> На главную </v-btn>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  middleware: "login-page-prevent",
});

const route = useRoute();
</script>

<style scoped></style>
