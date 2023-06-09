<template>
  <v-dialog
    :model-value="isOpened"
    @update:model-value="$emit('update:isOpened', $event)"
    width="500"
    persistent
  >
    <v-card class="pa-6">
      <v-card-title
        class="text-center text-h6 font-weight-bold text-wrap px-0 pb-0"
      >
        Удаление экзамена/консультации
      </v-card-title>

      <v-card-text class="px-0">
        <v-expand-transition>
          <v-alert type="error" class="mb-6" v-if="isDeleteError">
            <p>Произошла ошибка при удалении, повторите попытку позже!</p>
          </v-alert>
        </v-expand-transition>

        <p class="text-h6">
          Вы уверены что хотите удалить
          <span>{{
            exam.examType === "Консультация" ? "консультацию" : "экзамен"
          }}</span>
          по предмету
          <span class="font-weight-bold">{{ exam.className }}</span> ?
        </p>
      </v-card-text>
      <v-card-actions class="px-0">
        <v-btn
          variant="flat"
          color="red-darken-4"
          height="50"
          :loading="isDelitionLoading"
          @click="deleteGroupExam"
          >Да</v-btn
        >
        <v-btn
          height="50"
          variant="flat"
          color="indigo"
          @click="$emit('update:isOpened', false)"
          >Отмена</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { IGroupExam } from "~/types/core";

const props = defineProps<{ isOpened: boolean; exam: IGroupExam }>();
const emit = defineEmits<{
  (e: "update:isOpened", value: boolean): void;
  (e: "updateExams"): void;
}>();

const isDelitionLoading = ref(false);
const isDeleteError = ref(false);

const deleteGroupExam = async () => {
  try {
    console.log(props.exam.id);
    isDelitionLoading.value = true;

    await $fetch("/api/exams/delete/" + props.exam.id, { method: "delete" });

    emit("updateExams");
    emit("update:isOpened", false);
  } catch (error) {
    console.log(error);
    isDeleteError.value = true;
  } finally {
    isDelitionLoading.value = false;
  }
};
</script>

<style scoped></style>
