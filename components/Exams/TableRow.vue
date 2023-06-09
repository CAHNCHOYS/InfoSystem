<template>
  <tr class="text-subtitle-1 d-md-table-row d-block">
    <td class="d-md-table-cell d-block h-auto px-md-4 px-0 py-2">
      <span class="d-md-none d-inline pr-1 font-weight-bold">
        Название предмета:
      </span>
      <span> {{ exam.className }}</span>
    </td>
    <td class="d-md-table-cell d-block h-auto px-md-4 px-0 py-2">
      <span class="d-md-none d-inline pr-1 font-weight-bold">
        Преподаватель:
      </span>
      <span> {{ exam.teacherName }}</span>
    </td>
    <td class="d-md-table-cell d-block h-auto px-md-4 px-0 py-2">
      <span class="d-md-none d-inline pr-1 font-weight-bold"> Тип: </span>
      <span> {{ exam.examType }}</span>
    </td>
    <td class="d-md-table-cell d-block h-auto px-md-4 px-0 py-2">
      <span class="d-md-none d-inline pr-1 font-weight-bold">
        Время начала:
      </span>
      <span> {{ exam.time }}</span>
    </td>
    <td class="d-md-table-cell d-block h-auto px-md-4 px-0 py-2">
      <span class="d-md-none d-inline pr-1 font-weight-bold"> Дата: </span>
      <span> {{ exam.date }}</span>
    </td>

    <td
      class="py-2 d-md-table-cell d-block h-auto px-md-4 px-0"
      v-if="isActionsAllowed"
    >
      <v-row dense>
        <v-col cols="auto">
          <v-btn
            color="blue"
            icon="mdi-pencil"
            @click="$emit('updateExam', exam)"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="red"
            icon="mdi-delete"
            @click="$emit('deleteExam', exam)"
          />
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { IGroupExam } from "~/types/core";

const props = defineProps<{
  isActionsAllowed: boolean;
  exam: IGroupExam;
}>();

const emit = defineEmits<{
  (e: "deleteExam", exam: IGroupExam): void;
  (e: "updateExam", exam: IGroupExam): void;
}>();
</script>

<style scoped>
td {
}

@media (max-width: 960px) {
  td {
    border: unset !important;

  }
  tr{
    border-bottom: 1px solid #607D8B !important;
  }
  tr:not(:last-child) {
    margin-bottom: 0.75rem !important;
  }
}
</style>
