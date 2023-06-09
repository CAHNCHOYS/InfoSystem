<template>
  <div v-if="exams.length">
    <v-table>
      <thead>
        <tr class="d-md-table-row d-none">
          <th
            v-for="header in tableHeaders"
            class="text-left text-h6 font-weight-bold"
          >
            <span> {{ header }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <transition-group
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <ExamsTableRow
            v-for="sessionExam in exams"
            :exam="sessionExam"
            :is-actions-allowed="isStarostaUser"
            :key="sessionExam.id"
            @delete-exam="$emit('toggleDeleteDialog', $event)"
            @update-exam="$emit('toggleEditDialog', $event)"
          />
        </transition-group>
      </tbody>
    </v-table>
  </div>
  <div v-else>
    <p class="text-h6">
      Вы пока не создали расписание сесси, добавьте хоть одно кликнув на плюсик
      выше !
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IGroupExam } from "~/types/core";
const props = defineProps<{
  exams: IGroupExam[];
  isStarostaUser: boolean;
}>();

const emit = defineEmits<{
  (e: "toggleDeleteDialog", exam: IGroupExam): void;
  (e: "toggleEditDialog", exam: IGroupExam): void;
}>();

const tableHeaders = ref([
  "Предмет",
  "Преподаватель",
  "Тип",
  "Время",
  "Дата",
  "",
]);

const { beforeEnter, leave, enter } = useListAnimations();
</script>

<style scoped>

</style>
