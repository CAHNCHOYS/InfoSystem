<template>
  <h3 class="text-sm-h3 text-h5 mb-5">Список группы</h3>
  <v-card elevation="4" rounded="0">
    <v-card-text class="pa-0">
      <StudentsEditTable
        v-if="authStore.currentUser?.role === 'староста'"
        :students="students"
        :group-name="authStore.currentUser!.groupName"
        @refresh-data="refresh()"
      />
      <p v-else >Student table </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import type { IStudent } from "~/types/core";
definePageMeta({
  middleware: "check-auth",
});

const authStore = useAuthStore();

const {
  data: students,
  error: studentsFetchError,
  refresh,
} = await useFetch<IStudent[]>(
  "/api/students/all/" + authStore.currentUser!.groupId,
  {
    method: "GET",
  }
);

</script>

<style scoped></style>
