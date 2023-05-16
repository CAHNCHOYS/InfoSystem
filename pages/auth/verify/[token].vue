<template>
  <div
    class="h-screen overflow-auto d-flex justify-center align-center bg-blue"
  >
    <v-card class="pa-8 flex-grow-1" max-width="480">
      <v-card-title class="text-wrap mb-4 pa-0 py-2 text-h4">
        Подтверждение аккаунта
      </v-card-title>

      <v-card-text class="text-h6 pa-0 mb-8">
        <p class="text-error" v-if="error">
          {{ errorMessage }}
        </p>
        <p class="text-success" v-else>Аккаунт успешно активирован!</p>
      </v-card-text>
      <v-card-actions class="pa-0">
        <v-row no-gutters>
          <v-col cols="12" class="mb-4">
            <v-btn variant="flat" color="indigo" height="50" block>
              <nuxt-link to="/" class="text-decoration-none text-white">
                На главную
              </nuxt-link>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn variant="flat" color="green" height="50" block>
              <nuxt-link
                to="/auth/login/starosta"
                class="text-decoration-none text-white"
              >
                К авторизации
              </nuxt-link>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import  type { NuxtError } from "nuxt/app";

definePageMeta({
  layout: "login",
});

const route = useRoute();

const errorMessage = ref<string>("");

const { data, error } = await useFetch(
  "/api/auth/verify/" + route.params.token,
  {
    method: "patch",
  }
);
if (error.value) {
  console.log((error.value as NuxtError).statusCode);
  if ((error.value as NuxtError).statusCode === 400) {
    errorMessage.value = ` Ошибка при подтверждении аккаунта, код подвтерждения невалиден или
          истекло время активации. Отправьте новый код на почту с личного
          кабинета.`;
  } else {
    errorMessage.value = `Ошибка на сервере, возможно база данных недоступна!`;
  }
}
</script>

<style scoped></style>
