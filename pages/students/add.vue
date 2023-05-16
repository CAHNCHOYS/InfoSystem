<template>
  <div class="pt-4">
    <v-card class="px-7 pt-5 pb-7 mx-sm-0 mx-n3" elevation="8"  rounded="lg">
      <v-card-title class="text-md-h4 text-h5 text-wrap mb-7  pa-0 py-2"
        >Добавление студента в группу</v-card-title
      >
      <v-slide-x-transition>
        <v-alert v-if="isAddSuccess" type="success" class="mb-4">
          <p class="text-h6">Студент был добавлен!</p>
        </v-alert>
      </v-slide-x-transition>

      <v-alert type="error" v-if="addErrorMessage" class="mb-4">
        <p class="text-h6">{{ addErrorMessage }}</p>
      </v-alert>
      <v-card-actions class="pa-0">
        <v-form @submit.prevent="addSubmit" class="flex-grow-1">
          <v-row>
            <v-col sm="6" cols="12">
              <v-text-field
                v-model="firstName"
                :error-messages="firstNameErrors"
                label="Имя студента"
              />
            </v-col>
            <v-col sm="6" cols="12">
              <v-text-field
                v-model="secondName"
                :error-messages="secondNameErrors"
                label="Фамилия студента"
              />
            </v-col>

            <v-col sm="6" cols="12">
              <v-text-field
                v-model="thirdName"
                :error-messages="thirdNameErrors"
                label="Отчество студента"
              />
            </v-col>

            <v-col sm="6" cols="12">
              <v-text-field
                v-model="phone"
                :error-messages="phoneErrors"
                label="Телефон"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="address"
                :error-messages="addressErrors"
                label="Адрес"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="dateOfBirth"
                :error-messages="dateOfBirthErrors"
                label="Дата рождения"
                type="date"
              />
            </v-col>

            <v-col cols="12">
              <v-row>
                <v-col sm="auto" cols="12">
                  <v-btn
                    type="submit"
                    variant="flat"
                    height="50"
                    color="green-darken-4"
                    :loading="isSubmitting"
                    :block="xs"
                  >
                    Добавить студента
                  </v-btn></v-col
                >
                <v-col sm="auto" cols="12">
                  <v-btn
                    variant="flat"
                    @click="resetForm"
                    height="50"
                    color="error"
                    :disabled="isSubmitting"
                    :block="xs"
                  >
                    Очистить
                  </v-btn></v-col
                >
                <v-col sm="auto" cols="12">
                  <nuxt-link to="/students" class="d-block">
                    <v-btn
                      variant="flat"
                      @click="resetForm"
                      height="50"
                      color="blue"
                      :disabled="isSubmitting"
                      :block="xs"
                    >
                      Назад
                    </v-btn>
                  </nuxt-link>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useDisplay } from "vuetify/lib/framework.mjs";
import type { StudentForm } from "~/types/forms";

definePageMeta({
  middleware: "check-auth",
});

const { xs } = useDisplay();

//Валидация формы --------------------------------------

const { studentSchema } = useFormSchemas();

const { handleSubmit, resetForm, isSubmitting } = useForm<StudentForm>({
  validationSchema: studentSchema,
});

const { value: firstName, errorMessage: firstNameErrors } =
  useField("firstName");
const { value: secondName, errorMessage: secondNameErrors } =
  useField("secondName");
const { value: thirdName, errorMessage: thirdNameErrors } =
  useField("thirdName");
const { value: phone, errorMessage: phoneErrors } = useField("phone");
const { value: dateOfBirth, errorMessage: dateOfBirthErrors } =
  useField("dateOfBirth");
const { value: address, errorMessage: addressErrors } = useField("address");

//----------------------------------------------------

//Добавление студента-------------------------------------------------------------
const isAddSuccess = ref(false);
const addErrorMessage = ref<string | null>(null);
const authStore = useAuthStore();

const addSubmit = handleSubmit(async (addStudentPayload: StudentForm) => {
  try {
    await $fetch("/api/students", {
      method: "POST",
      body: { ...addStudentPayload, groupId: authStore.currentUser?.groupId },
      credentials: "include",
    });
    addErrorMessage.value = null;
    isAddSuccess.value = true;
    setTimeout(() => (isAddSuccess.value = false), 3200);
    resetForm();
  } catch (error) {
    addErrorMessage.value =
      "Ошибка при добавлении студента, возможно база данны недоступна, повторите попытку позже";
  }
});

//-----------------------------------------------------------------------------------------
</script>

<style scoped></style>
