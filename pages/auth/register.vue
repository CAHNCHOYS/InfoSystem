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
        Регистрация старосты</v-card-title
      >

      <v-alert
        type="error"
        variant="flat"
        class="mb-5"
        v-if="registerErrorMessage"
      >
        <p class="text-h6">{{ registerErrorMessage }}</p>
      </v-alert>

      <v-alert
        type="success"
        variant="flat"
        class="mb-5"
        v-if="isRegisterSuccess"
      >
        <p class="text-h6">
          Регистрация прошла успешно, можете перейти к авторизации. Также
          подтвердите ваш email!
        </p>
      </v-alert>

      <v-card-actions>
        <v-form @submit.prevent="registerSubmit" class="w-100">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                color="white"
                class="text-white"
                prepend-inner-icon="mdi-email"
                label="Почта"
                hint="Почта для входа на сайт"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                class="text-white"
                prepend-inner-icon="mdi-lock"
                label="Пароль"
                :append-inner-icon="isPasswordSeen ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="isPasswordSeen = !isPasswordSeen"
                :type="isPasswordSeen ? 'text' : 'password'"
                color="white"
                hint="Пароль для входа на сайт"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="firstName"
                :error-messages="firstNameErrors"
                label="Имя"
                color="white"
                class="text-white"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="lastName"
                :error-messages="lastNameErrors"
                class="text-white"
                label="Фамилия"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="middleName"
                :error-messages="middleNameErrors"
                class="text-white"
                label="Отчество"
              />
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-if="!groupsFetchError"
                v-model="groupId"
                :items="allGroups || []"
                item-title="name"
                item-value="id"
                :error-messages="groupIdErrors"
                prepend-inner-icon="mdi-account-group"
                class="text-white"
                label="Группа"
                no-data-text="Группы не найдены"
              />
              <v-alert variant="flat" type="error" v-else>
                <p class="text-h6">
                  Ошибка при получении групп, регистрация невозможна, повторите
                  попытку позже!
                </p>
              </v-alert>
            </v-col>

            <v-col cols="12">
              <v-btn
                type="submit"
                block
                variant="flat"
                color="indigo-darken-4"
                :loading="isSubmitting"
                :disabled="isRegisterSuccess"
              >
                Зарегистрироваться
              </v-btn>
              <p class="mt-2 text-white text-h6" v-if="!isRegisterSuccess">
                Уже есть аккаунт?
                <nuxt-link
                  class="text-yellow font-weight-bold"
                  to="/auth/login/starosta"
                  >Авторизироваться</nuxt-link
                >
              </p>
            </v-col>

            <v-col cols="12">
              <v-expand-transition>
                <nuxt-link
                  to="/auth/login/starosta"
                  class="d-block"
                  v-if="isRegisterSuccess"
                >
                  <v-btn block variant="flat" color="green">
                    Перейти к авторизации
                  </v-btn>
                </nuxt-link>
              </v-expand-transition>
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
import { NuxtError } from "nuxt/app";
import type { StarostaRegisterForm } from "~/types/forms";
import type { IStudentGroup } from "~/types/core";
definePageMeta({
  layout: "login",
});

const config = useRuntimeConfig();

//Валидация формы----------------------------------------------------------
const { registerSchema } = useFormSchemas();

const { handleSubmit, isSubmitting } = useForm<StarostaRegisterForm>({
  validationSchema: registerSchema,
});

const { value: firstName, errorMessage: firstNameErrors } =
  useField("firstName");
const { value: lastName, errorMessage: lastNameErrors } = useField("lastName");
const { value: middleName, errorMessage: middleNameErrors } =
  useField("middleName");
const { value: email, errorMessage: emailErrors } = useField("email");
const { value: password, errorMessage: passwordErrors } = useField("password");
const { value: groupId, errorMessage: groupIdErrors } = useField("groupId");

//--------------------------------------------------------------------------

const { data: allGroups, error: groupsFetchError } = await useFetch<
  IStudentGroup[]
>("/api/groups");

const registerErrorMessage = ref<string | null>(null);
const isRegisterSuccess = ref(false);

const isPasswordSeen = ref(false);

const registerSubmit = handleSubmit(
  async (registerPayload: StarostaRegisterForm) => {
    console.log(registerPayload);
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: registerPayload,
      });

      isRegisterSuccess.value = true;
      registerErrorMessage.value = null;
    } catch (error) {
      if ((error as NuxtError).statusCode === 406) {
        registerErrorMessage.value =
          "Староста с таким email уже был зарегистрирован, войдите в аккаунт!";
      } else {
        registerErrorMessage.value =
          "Ошибка на при регистрации, возможно, староста выбранной группы уже зарегистрирован, или база данных недоступна!";
      }
    }
  }
);

//Параллакс при движении мыши
const { parallaxItems } = useAuthMouseParallax();
</script>

<style lang="scss" scoped>
@import "~/assets/scss/auth.scss";
</style>
