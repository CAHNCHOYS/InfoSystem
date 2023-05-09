<template>
  <div class="h-100">
    <v-row class="login-row overflow-auto" no-gutters>
      <v-col cols="6" class="d-flex align-center justify-center pa-2">
        <v-card color="#24221F" class="flex-grow-1 pa-6" max-width="512">
          <v-card-actions>
            <v-form @submit.prevent="" class="w-75 mx-auto py-6">
              <h2 class="text-white mb-12">
                <v-icon icon="mdi-exit-run yellow-text pr-2" /> Авторизация
                старосты
              </h2>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    label="Email"
                    color="#FFC632"
                    class="text-white"
                  >
                    <template #prepend-inner>
                      <v-icon icon="mdi-email" />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    label="Пароль"
                    color="#FFC632"
                    class="text-white"
                    :type="isPasswordShown ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordShown ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append-inner="isPasswordShown = !isPasswordShown"
                  >
                    <template #prepend-inner>
                      <v-icon icon="mdi-lock" />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="#FFC632"
                    class="mb-4"
                    variant="flat"
                    height="55"
                    type="submit"
                  >
                    <span class="btn-text font-weight-bold">Войти</span>
                  </v-btn>
                  <p class="yellow-text text-center">
                    Нет аккаунта ?
                    <NuxtLink
                      to="/Auth/register"
                      class="font-weight-bold yellow-text text-decoration-none"
                      >Создать</NuxtLink
                    >
                  </p>
                </v-col>
              </v-row>
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

const isPasswordShown = ref(false);

const formSubmit = async () => {
  console.log("submitted");
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/auth.scss";

</style>
