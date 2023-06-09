<template>
  <div class="h-100 d-flex justify-center align-center overflow-auto pa-5">
    <v-card
      class="flex-grow-1 card rounded-lg pa-sm-16 pa-5 overflow-auto"
      elevation="10"
      max-width="640"
    >
      <v-card-title
        class="text-white text-h5 pa-0 mb-10 font-weight-bold text-wrap text-sm-left text-center"
      >
        Авторизация старосты
      </v-card-title>

      <v-scale-transition>
        <v-alert
          type="success"
          variant="flat"
          class="mb-5"
          v-if="isLoginSuccess"
        >
          <p class="text-h6">
            Авторизация прошла успешна, вскоре вы будете переведены на главную
            страницу!
          </p>
        </v-alert>
      </v-scale-transition>

      <v-scale-transition>
        <v-alert
          type="error"
          variant="flat"
          class="mb-5"
          v-if="loginErrorMessage"
        >
          <p class="text-h6">{{ loginErrorMessage }}</p>
        </v-alert>
      </v-scale-transition>

      <v-card-actions>
        <v-form @submit.prevent="handleLogin" class="w-100">
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-if="allGroups?.length"
                v-model="groupId"
                :items="allGroups"
                item-title="name"
                item-value="id"
                :error-messages="groupIdErrors"
                prepend-inner-icon="mdi-account-group"
                class="text-white"
                label="Группа университета"
                no-data-text="Группы не найдены"
              />
              <v-alert type="error" variant="flat" v-else>
                <p class="text-h6">
                  Ошибка при загрузке групп для авторизации, повторите попытку
                  позже
                </p>
              </v-alert>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                variant="outlined"
                class="text-white"
                label="Пароль"
                color="white"
                :type="isPasswordShown ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="isPasswordShown = !isPasswordShown"
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                type="submit"
                variant="flat"
                block
                color="green"
                :loading="isSubmitting"
              >
                Войти
              </v-btn>
            </v-col>
            <v-col cols="12">
              <nuxt-link to="/" class="d-block">
                <v-btn variant="flat" block color="indigo-darken-4">
                  На главную страницу
                </v-btn></nuxt-link
              >
              <p class="text-h6 text-white mt-2">
                Нет аккаунта ?
                <nuxt-link
                  to="/auth/register"
                  class="font-weight-bold text-yellow"
                >
                  Создать
                </nuxt-link>
              </p>
            </v-col>
          </v-row>
        </v-form>
      </v-card-actions>
    </v-card>

    <v-img
      v-for="(decor, n) in parallaxItems"
      class="d-md-block d-none"
      :key="decor.picture"
      :src="config.public.images + `/Register/${decor.picture}`"
      :class="[
        'decor-item',
        'decor-item_' + (n + 1),
        decor.reverse ? 'reverse' : '',
      ]"
      :width="decor.width"
      :height="decor.height"
    />
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useGroupStudentsStore } from "~/stores/groupStudents";
import type { NuxtError } from "nuxt/app";
import type { StarostaLoginForm } from "~/types/forms";
import type { IStarostaUser, IStudentGroup } from "~/types/core";

definePageMeta({
  layout: "login",
});

const config = useRuntimeConfig();

//-----------Валидация формы -------------------------------------------
const { starostaLoginSchema } = useFormSchemas();

const { handleSubmit, resetForm, isSubmitting } = useForm<StarostaLoginForm>({
  validationSchema: starostaLoginSchema,
});

const { value: groupId, errorMessage: groupIdErrors } = useField("groupId");
const { value: password, errorMessage: passwordErrors } = useField("password");
//-----------------------------------------------------------------------

//Авторизация------------------------------------------------------------
const { data: allGroups, error: groupsFetchError } = await useFetch<
  IStudentGroup[]
>("/api/groups");

const isPasswordShown = ref(false);
const loginErrorMessage = ref<string | null>(null);
const isLoginSuccess = ref(false);

const authStore = useAuthStore();
const groupStudentsStore = useGroupStudentsStore();
const route = useRoute();

const handleLogin = handleSubmit(async (loginPayload: StarostaLoginForm) => {
  try {
    const starosta = await $fetch<IStarostaUser>("/api/auth/login/starosta", {
      method: "POST",
      body: loginPayload,
    });
    isLoginSuccess.value = true;
    loginErrorMessage.value = null;
    authStore.setUser(starosta);
    await groupStudentsStore.getAllGroupStudents(starosta.groupId);
    setTimeout(async () => {
      if (route.query.redirectedFrom) {
        await navigateTo(route.query.redirectedFrom as string);
      } else await navigateTo("/");
    }, 2000);
  } catch (error) {
    const err = error as NuxtError;
    if (err.statusCode === 404) {
      loginErrorMessage.value =
        "Староста выбранной группы на зарегистрирован! Создайте аккаунт или выберете другую группу";
    } else if (err.statusCode === 400) {
      loginErrorMessage.value =
        "Неверный пароль от аккаунта,  повторите попытку!";
    } else {
      loginErrorMessage.value =
        "Ошибка на сервере, возможно, база данных недоступна, повторите попытку позже!";
    }
    resetForm();
  }
});

//----------------------------------------------------------------------------------------

const { parallaxItems } = useAuthMouseParallax();
</script>

<style lang="scss" scoped>
@import "~/assets/scss/auth.scss";
</style>
