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
        Авторизация студента
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
                v-if="allGroups"
                v-model="groupId"
                :items="allGroups"
                item-title="name"
                item-value="id"
                :error-messages="groupIdErrors"
                prepend-inner-icon="mdi-account-group"
                class="text-white"
                label="Название группы университета"
                no-data-text="Группы не найдены"
              />
              <v-alert type="error" variant="flat" class="mb-5" v-else>
                <p class="text-h6">
                  Ошибка при получении групп, авторизация невозможна, повторите
                  попытку позже!
                </p>
              </v-alert>
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
                v-model="firstName"
                :error-messages="firstNameErrors"
                label="Имя"
                color="white"
                class="text-white"
              />
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
import { NuxtError } from "nuxt/app";
import type { StudentLoginForm } from "~/types/forms";
import type { IStudentGroup, IStudentUser } from "~/types/core";
import { useGroupStudentsStore } from "~/stores/groupStudents";

definePageMeta({
  layout: "login",
});

const config = useRuntimeConfig();

//-----------Валидация формы -------------------------------------------
const { studentLoginSchema } = useFormSchemas();

const { handleSubmit, isSubmitting } = useForm<StudentLoginForm>({
  validationSchema: studentLoginSchema,
});

const { value: groupId, errorMessage: groupIdErrors } = useField("groupId");
const { value: firstName, errorMessage: firstNameErrors } =
  useField("firstName");
const { value: lastName, errorMessage: lastNameErrors } = useField("lastName");
const { value: middleName, errorMessage: middleNameErrors } =
  useField("middleName");

//-----------------------------------------------------------------------

//Авторизация------------------------------------------------------------
const { data: allGroups, error: groupsFetchError } = await useFetch<
  IStudentGroup[]
>("/api/groups");

const loginErrorMessage = ref<string | null>(null);
const isLoginSuccess = ref(false);

const groupStudentsStore = useGroupStudentsStore();
const authStore = useAuthStore();
const route = useRoute();

const handleLogin = handleSubmit(async (loginPayload: StudentLoginForm) => {
  try {
    const student = await $fetch<IStudentUser>("/api/auth/login/student", {
      method: "post",
      body: loginPayload,
    });
    loginErrorMessage.value = null;
    isLoginSuccess.value = true;
    authStore.setUser(student);
    await groupStudentsStore.getAllGroupStudents(student.groupId);
    setTimeout(async () => {
      if (route.query.redirectedFrom) {
        await navigateTo(route.query.redirectedFrom as string);
      } else await navigateTo("/");
    }, 2000);
  } catch (error) {
    const err = error as NuxtError;
    if (err.statusCode === 404) {
      loginErrorMessage.value =
        "Студент с такими данными не найден в группе, проверьте корректность данных!";
    } else if (err.statusCode === 400) {
      loginErrorMessage.value =
        "Студент с такими данными является старостой, войдите как староста или введите другие данные!";
    } else {
      loginErrorMessage.value =
        "Ошибка при авторизации повторите попытку позже!";
    }
  }
});

//----------------------------------------------------------------------------------------

const { parallaxItems } = useAuthMouseParallax();
</script>

<style lang="scss" scoped>
@import "~/assets/scss/auth.scss";
</style>
