<template>
  <div class="pt-4">
    <v-card class="px-7 pt-5 pb-7 mx-sm-0 mx-n3" elevation="8" rounded="lg">
      <v-card-title class="text-md-h4 text-h5 text-wrap mb-7 pa-0 py-2"
        >Изменение информации о студенте</v-card-title
      >

      <v-slide-x-transition>
        <v-alert v-if="isEditSuccess" type="success" class="mb-7">
          <p class="text-h6">Информация о студенте была успешно обновлена!</p>
        </v-alert>
      </v-slide-x-transition>

      <v-alert type="error" v-if="editErrorMessage" class="mb-4">
        <p class="text-h6">{{ editErrorMessage }}</p>
      </v-alert>

      <v-card-actions class="pa-0" v-if="studentToEdit">
        <v-form @submit.prevent="editSubmit" class="flex-grow-1">
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
                v-model="lastName"
                :error-messages="lastNameErrors"
                label="Фамилия студента"
              />
            </v-col>

            <v-col sm="6" cols="12">
              <v-text-field
                v-model="middleName"
                :error-messages="middleNameErrors"
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
                    Обновить информацию
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
                      Назад к студентам
                    </v-btn>
                  </nuxt-link>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-actions>

      <div class="text-h6" v-else>
        <v-alert type="error" class="mb-8"
          ><p class="text-h6">
            Не удалось загрузить данные выбранного студента, вернитесь на
            страницу студентов или повторите попытку позже
          </p>
        </v-alert>

        <nuxt-link to="/students">
          <v-btn variant="flat" height="50" color="indigo"> К студентам </v-btn>
        </nuxt-link>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useAuthStore } from "~/stores/auth";
import { useGroupStudentsStore } from "~/stores/groupStudents";
import type { StudentForm } from "~/types/forms";

definePageMeta({
  middleware: ["check-auth", "check-starosta"],
});

const { xs } = useDisplay();

const route = useRoute();
const authStore = useAuthStore();

const { data: studentToEdit, error: fetchStudentError } =
  await useFetch<StudentForm>(
    `/api/students/single/${authStore.currentUser!.groupId}/${
      route.params.studentId
    }`
  );

//Валидация формы --------------------------------------

const { studentSchema } = useFormSchemas();

const defaultFormValues = computed(() => {
  return studentToEdit.value;
});

const { handleSubmit, resetForm, isSubmitting } = useForm<StudentForm>({
  validationSchema: studentSchema,
  initialValues: {
    ...defaultFormValues.value,
    dateOfBirth: formatDate(
      defaultFormValues.value?.dateOfBirth || "12-12-2002"
    ),
  },
});

const { value: firstName, errorMessage: firstNameErrors } =
  useField("firstName");
const { value: lastName, errorMessage: lastNameErrors } = useField("lastName");
const { value: middleName, errorMessage: middleNameErrors } =
  useField("middleName");
const { value: phone, errorMessage: phoneErrors } = useField("phone");
const { value: dateOfBirth, errorMessage: dateOfBirthErrors } =
  useField("dateOfBirth");
const { value: address, errorMessage: addressErrors } = useField("address");

//----------------------------------------------------

const isEditSuccess = ref(false);
const editErrorMessage = ref<string | null>();

const groupStudentsStore = useGroupStudentsStore();

const editSubmit = handleSubmit(async (editPayload: StudentForm) => {
  try {
    await $fetch("/api/students", {
      method: "PATCH",
      body: {
        ...editPayload,
        studentId: route.params.studentId,
      },
    });
    groupStudentsStore.updateStudent({
      ...editPayload,
      id: +(route.params.studentId as string),
      fullName:
        editPayload.firstName +
        " " +
        editPayload.lastName +
        " " +
        editPayload.middleName,
    });
    editErrorMessage.value = null;
    isEditSuccess.value = true;
    setTimeout(() => (isEditSuccess.value = false), 4000);
  } catch (error) {
    editErrorMessage.value =
      "Ошибка при обновлении информации о студенте, повторите попытку позже!";
  }
});
</script>

<style scoped></style>
