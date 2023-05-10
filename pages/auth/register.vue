<template>
  <div class="h-100 d-flex justify-center align-center overflow-auto pa-5">
    <v-card
      class="flex-grow-1 card rounded-lg pa-sm-16 pa-5 overflow-auto"
      elevation="10"
      max-width="640"
    >
      <v-card-title
        class="text-white text-h5 pa-0 mb-5 font-weight-bold text-wrap text-sm-left text-center"
      >
        Регистрация старосты</v-card-title
      >

      <v-card-actions>
        <v-form @submit.prevent="registerSubmit" class="w-100">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                base-color="white"
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
                base-color="white"
                class="text-white"
                prepend-inner-icon="mdi-lock"
                label="Пароль"
                hint="Пароль для входа на сайт"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="firstName"
                :error-messages="firstNameErrors"
                class="text-white"
                label="Имя"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="secondName"
                :error-messages="secondNameErrors"
                class="text-white"
                label="Фамилия"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="thirdName"
                :error-messages="thirdNameErrors"
                class="text-white"
                label="Отчество"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="group"
                :error-messages="groupErrors"
                prepend-inner-icon="mdi-account-group"
                class="text-white"
                label="Название группы университета"
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                type="submit"
                block
                variant="flat"
                color="indigo-darken-4"
                :loading="isSubmitting"
              >
                Зарегистрироваться
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-actions>
    </v-card>

    <v-img
      v-for="(decor, n) in decorItems"
      class="d-md-block d-none"
      :key="decor.picture"
      :src="config.public.images + `/Register/${decor.picture}`"
      :class="['decor-item', 'decor-item_' + (n + 1)]"
      :width="decor.width"
      :height="decor.height"
    />
  </div>
</template>

<script setup lang="ts">
import type { RegisterForm } from "~/types/forms";
definePageMeta({
  layout: "login",
});

const config = useRuntimeConfig();

//Валидация формы----------------------------------------------------------
const { registerSchema } = useFormSchemas();

const { handleSubmit, handleReset, isSubmitting } = useForm<RegisterForm>({
  validationSchema: registerSchema,
});

const { value: firstName, errorMessage: firstNameErrors } =
  useField("firstName");
const { value: secondName, errorMessage: secondNameErrors } =
  useField("secondName");
const { value: thirdName, errorMessage: thirdNameErrors } =
  useField("thirdName");
const { value: email, errorMessage: emailErrors } = useField("email");
const { value: password, errorMessage: passwordErrors } = useField("password");
const { value: group, errorMessage: groupErrors } = useField("group");

//--------------------------------------------------------------------------

const registerSubmit = handleSubmit(async (registerPayload) => {
  console.log(registerPayload);

  try {
    const data = await $fetch("/api/auth/register", {
      method: "POST",
      body: registerPayload,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

//Decorations ---------------------------------
type DecorItem = {
  picture: string;
  width: string;
  height: string;
  reverse?: boolean;
};
const decorItems = ref<DecorItem[]>([
  {
    picture: "decor1.png",
    width: "33%",
    height: "59%",
  },
  {
    picture: "decor2.png",
    width: "12%",
    height: "8%",
    reverse: true,
  },
  {
    picture: "decor3.png",
    width: "10%",
    height: "10%",
  },
  {
    picture: "decor3.png",
    width: "10%",
    height: "10%",
    reverse: true,
  },
  {
    picture: "decor4.png",
    width: "33%",
    height: "18%",
  },
  {
    picture: "decor5.png",
    width: "15%",
    height: "15%",
    reverse: true,
  },
  {
    picture: "decor3.png",
    width: "10%",
    height: "10%",
  },
]);
</script>

<style lang="scss" scoped>
@import "~/assets/scss/auth.scss";

.decor-item {
  position: absolute;
  z-index: 1;

  &_1 {
    width: 500px;
    height: 500px;
    top: calc(101 / 1080 * 100%);
    right: calc(320 / 1920 * 100%);
  }

  &_2 {
    top: calc(484 / 1080 * 100%);
    left: calc(378 / 1920 * 100%);
  }

  &_3 {
    top: calc(788 / 1080 * 100%);
    right: calc(479 / 1920 * 100%);
  }

  &_4 {
    top: calc(868 / 1080 * 100%);
    right: calc(380 / 1920 * 100%);
  }

  &_5 {
    top: calc(868 / 1080 * 100%);
    left: calc(280 / 1920 * 100%);
  }

  &_6 {
    top: 0;
    left: calc(512 / 1920 * 100%);
    transform: translate(0, -10%);
  }

  &_7 {
    top: calc(218 / 1080 * 100%);
    left: calc(280 / 1920 * 100%);
  }
}
</style>
