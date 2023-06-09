<template>
  <v-dialog
    :model-value="isOpened"
    @update:model-value="$emit('update:isOpened', $event)"
    width="800"
  >
    <v-card class="pa-sm-7 pa-5">
      <v-card-title class="px-0 text-center text-wrap font-weight-bold">
        Добавление экзамена/консультации
      </v-card-title>

      <v-card-text class="px-0">
        <v-slide-x-transition>
          <v-alert type="error" class="mb-6" v-if="isAddError">
            <p class="text-h6">
              Произошла ошибка при добавлении экзамена, повторите попытку позже
            </p>
          </v-alert>
        </v-slide-x-transition>

        <v-form @submit="addSessionExamSubmit">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="className"
                :error-messages="classNameErrors"
                label="Название предмета"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="teacherName"
                :error-messages="teacherNameErrors"
                label="ФИО преподавателя"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="date"
                :error-messages="dateErrors"
                label="Дата"
                type="date"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="time"
                :error-messages="timeErrors"
                label="Время начала"
              />
            </v-col>
            <v-col cols="12">
              <v-radio-group
                v-model="examtype"
                :error-messages="examtypeErrors"
                label="Выберете тип"
                inline
              >
                <v-radio
                  label="Консультация"
                  value="Консультация"
                  color="black"
                  class="font-high-emphasis font-weight-bold text-high-emphasis"
                />
                <v-radio
                  label="Экзамен"
                  value="Экзамен"
                  color="black"
                  class="font-high-emphasis font-weight-bold text-high-emphasis"
                />
              </v-radio-group>
            </v-col>
            <v-col>
              <v-row>
                <v-col sm="auto" cols="12">
                  <v-btn
                    type="submit"
                    color="green"
                    variant="flat"
                    :loading="isSubmitting"
                    block
                  >
                    Добавить
                  </v-btn></v-col
                >
                <v-col sm="auto" cols="12">
                  <v-btn
                    color="red-darken-1"
                    variant="flat"
                    block
                    @click="handleReset()"
                  >
                    Очистить форму
                  </v-btn></v-col
                >
                <v-col sm="auto" cols="12">
                  <v-btn
                    color="indigo"
                    variant="flat"
                    block
                    @click="$emit('update:isOpened', false)"
                  >
                    Закрыть
                  </v-btn></v-col
                >
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { SessionExamForm } from "~/types/forms";

const props = defineProps<{
  isOpened: boolean;
  groupId: number;
}>();
const emit = defineEmits<{
  (e: "update:isOpened", value: boolean): void;
  (e: "updateExams"): void;
}>();

//----------------------------------------------------
const { sessionSchema } = useFormSchemas();

const { handleReset, handleSubmit, isSubmitting } = useForm<SessionExamForm>({
  validationSchema: sessionSchema,
});

const { value: className, errorMessage: classNameErrors } =
  useField<string>("className");
const { value: teacherName, errorMessage: teacherNameErrors } =
  useField<string>("teacherName");

const { value: date, errorMessage: dateErrors } = useField<string>("date");
const { value: time, errorMessage: timeErrors } = useField<string>("time");
const { value: examtype, errorMessage: examtypeErrors } =
  useField<string>("examType");

examtype.value = "Экзамен";
//---------------------------------------------------------

const isAddError = ref(false);

const addSessionExamSubmit = handleSubmit(async (values: SessionExamForm) => {
  try {
    await $fetch("/api/exams", {
      method: "POST",
      body: {
        ...values,
        groupId: props.groupId,
      },
    });
    emit("updateExams");
    emit("update:isOpened", false);
  } catch (error) {
    isAddError.value = true;
    console.log(error);
  } finally {
    handleReset();
  }
});
</script>

<style scoped></style>
