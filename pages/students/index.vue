<template>
  <h3 class="text-sm-h3 text-h5 mb-sm-7 mb-5">Список группы</h3>
  <v-card elevation="4" rounded="0" class="mx-sm-0 mx-n3">
    <v-card-text class="pa-0">
      <div v-if="!groupStudentsStore.studentsFetchError">
        <StudentsEditTable
          v-if="authStore.currentUser?.role === 'староста'"
          :students="groupStudentsStore.students || []"
          :group-name="authStore.currentUser!.groupName"
          @delete-students="groupStudentsStore.deleteStudents($event)"
        />
        <StudentsViewTable
          :students="groupStudentsStore.students || []"
          v-else
        />
      </div>
      <v-alert type="error" rounded="0" v-else>
        <p class="text-h6">
          Ошибка при загрузке студентов группы, обновите страницу или повторите
          попытку позже!
        </p>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useGroupStudentsStore } from "~/stores/groupStudents";
import { useAuthStore } from "~/stores/auth";
definePageMeta({
  middleware: "check-auth",
});

const authStore = useAuthStore();
const groupStudentsStore = useGroupStudentsStore();
</script>

<style scoped></style>
