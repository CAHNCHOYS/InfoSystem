<template>
  <div>
    <h3 class="text-sm-h3 text-h4 mb-sm-7 mb-5">Список группы</h3>
    <v-card
      elevation="4"
      rounded="0"
      class="mx-sm-0 mx-n3"
      v-if="!groupStudentsStore.studentsFetchError"
    >
      <v-card-text class="pa-0">
        <StudentsEditTable
          v-if="authStore.currentUser?.role === 'староста'"
          :students="groupStudentsStore.students || []"
          :group-name="authStore.currentUser!.groupName"
          @delete-students="groupStudentsStore.deleteStudents($event)"
        />
        <StudentsViewTable
          :students="groupStudentsStore.students || []"
          :current-user-full-name="authStore.currentUser!.fullName"
          v-else
        />
      </v-card-text>
    </v-card>
    <v-alert type="error" rounded="0" v-else>
      <p class="text-h6">
        Ошибка при загрузке студентов группы, обновите страницу или повторите
        попытку позже!
      </p>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { useGroupStudentsStore } from "~/stores/groupStudents";
import { useAuthStore } from "~/stores/auth";
definePageMeta({
  middleware: ["check-auth"],
});

const authStore = useAuthStore();
const groupStudentsStore = useGroupStudentsStore();
</script>

<style scoped></style>
