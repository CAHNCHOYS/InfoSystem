<template>
  <tr>
    <td
      class="py-1 d-md-table-cell d-block h-auto text-h6"
      :style="{
        width: !smAndDown ? '65%' : '100%',
      }"
    >
      <span class="d-md-none d-inline font-weight-bold pr-1">Имя: </span>
      <span> {{ student.fullName }} </span>
    </td>
    <td class="py-1 w-auto d-md-table-cell d-block h-auto">
      <v-row align="center" dense>
        <v-col class="text-h6" v-show="!isUserEditing">
          <span class="d-md-none d-inline font-weight-bold pr-1"
            >Пропуски:
          </span>
          <span class="flex-grow-1 pr-2">{{
            attendance?.skippedHours || 0
          }}</span>
        </v-col>
        <v-col class="flex-grow-1" v-show="isUserEditing">
          <v-text-field
            v-model="skippedHours"
            variant="underlined"
            label="Часов пропуска"
            class="flex-grow-1 blue-grey text-h4 my-input"
            type="number"
            color="black"
            dirty
          />
        </v-col>
        <v-col cols="auto" v-show="!isUserEditing && isEditAllowed">
          <v-btn
            icon="mdi-pencil"
            @click="isUserEditing = true"
            color="green"
          />
        </v-col>
        <v-col cols="auto" v-show="isUserEditing">
          <v-btn
            icon="mdi-content-save-all-outline"
            @click="emitAction"
            color="blue"
            class="mr-1"
          />
        </v-col>
        <v-col cols="auto" v-show="isUserEditing">
          <v-btn icon="mdi-pencil-off" @click="cancelEditing" color="error" />
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import type { IStudentAttendance, IStudent } from "~/types/core";

const props = defineProps<{
  student: IStudent;
  attendance: IStudentAttendance | undefined;
  isEditAllowed: boolean;
}>();

const emit = defineEmits<{
  (e: "handleAttendanceAdd", studentId: number, newSkippedHours: number): void;
  (
    e: "handleAttendanceUpdate",
    studentId: number,
    newSkippedHours: number
  ): void;
}>();

const isUserEditing = ref(false);
const skippedHours = ref(props.attendance?.skippedHours || 0);

const cancelEditing = () => {
  skippedHours.value = props.attendance?.skippedHours || 0;
  isUserEditing.value = false;
};

const emitAction = () => {
  isUserEditing.value = false;
  if (
    skippedHours.value < 0 ||
    skippedHours.value >= 800 ||
    !skippedHours.value
  )
    return;
  if (props.attendance) {
    emit("handleAttendanceUpdate", props.student.id, skippedHours.value);
  } else {
    emit("handleAttendanceAdd", props.student.id, skippedHours.value);
  }
};

const { smAndDown } = useDisplay();
</script>

<style lang="scss" scoped>
@media (max-width: 960px) {
  td {
    border-bottom: none !important;
  }
  tr:not(:last-child) {
    border-bottom: 1px solid grey !important;
    display: block;
  }
}
</style>
