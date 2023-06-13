<template>
  <div>
    <h3 class="text-sm-h3 text-h5 mb-sm-7 mb-5">Кол-во пропусков в семестре</h3>
    <v-card
      elevation="4"
      rounded="0"
      class="mx-sm-0 mx-n3 pa-5"
      v-if="!attendanceFetchError"
    >
      <v-card-text class="px-0">
        <v-table v-if="!isActionLoading && !actionErrorMessage">
          <thead>
            <tr class="d-md-table-row d-none">
              <th class="text-h5 text-left">Имя студента</th>
              <th class="text-h5 text-left">Пропуски (в часах)</th>
            </tr>
          </thead>
          <tbody>
            <StudentsAttendanceRow
              v-for="student in groupStudentsStore.students"
              :key="student.id"
              :student="student"
              :attendance="findStudentAttendance(student.id)"
              :is-edit-allowed="authStore.currentUser!.role === 'староста'"
              :current-user-full-name="authStore.currentUser?.fullName"
              @handle-attendance-add="addStudentAttendance"
              @handle-attendance-update="updateStudentAttendance"
            />
            <tr>
              <td class="text-h6" colspan="2">
                Всего пропущено часов:
                <span class="font-weight-bold">{{ countAllSkippedHours }}</span>
              </td>
            </tr>
          </tbody>
        </v-table>

        <p class="text-center" v-else-if="!actionErrorMessage">
          <v-progress-circular size="50" indeterminate color="indigo" />
        </p>

        <v-alert type="error" v-else>
          <p class="text-h6">
            {{ actionErrorMessage }}
          </p>
        </v-alert>
      </v-card-text>

      <v-card-actions v-if="authStore.currentUser!.role === 'староста'">
        <v-btn
          @click="clearAllAttendance"
          variant="flat"
          class="px-4"
          color="error"
          append-icon="mdi-trash-can"
          rounded="0"
        >
          Очистить все пропуски
        </v-btn>
      </v-card-actions>
    </v-card>
    <div v-else>
      <v-alert type="error">
        <p class="text-h6">
          Ошибка при загрузке посещений, попробуйте обновить странциу или
          повторите попытку позже.
        </p>
      </v-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useGroupStudentsStore } from "~/stores/groupStudents";
import type { IStudentAttendance } from "~/types/core";

definePageMeta({
  middleware: "check-auth",
});

const authStore = useAuthStore();
const groupStudentsStore = useGroupStudentsStore();

const {
  data: attendances,
  error: attendanceFetchError,
  refresh: refreshAttendace,
} = await useFetch<IStudentAttendance[]>(
  "/api/attendance/" + authStore.currentUser!.groupId
);

const findStudentAttendance = computed(() => {
  return function (studentId: number) {
    return attendances.value!.find(
      (attendance) => studentId === attendance.studentId
    );
  };
});

const countAllSkippedHours = computed(() => {
  return attendances.value?.reduce(
    (acc, attendance) => acc + attendance.skippedHours,
    0
  );
});

const isActionLoading = ref(false);
const actionErrorMessage = ref<string | null>(null);

const addStudentAttendance = async (
  studentId: number,
  skippedHours: number
) => {
  try {
    isActionLoading.value = true;
    await $fetch("/api/attendance", {
      method: "POST",
      body: {
        studentId,
        groupId: authStore.currentUser?.groupId,
        skippedHours,
      },
    });
    await refreshAttendace();
  } catch (error) {
    actionErrorMessage.value =
      "Произошла ошибка, обновите странциу и  повторите попытку позже";
  } finally {
    isActionLoading.value = false;
  }
};

const updateStudentAttendance = async (
  studentId: number,
  skippedHours: number
) => {
  try {
    isActionLoading.value = true;
    await $fetch("/api/attendance", {
      method: "PATCH",
      body: {
        studentId,
        skippedHours,
      },
    });
    await refreshAttendace();
  } catch (error) {
    actionErrorMessage.value =
      "Произошла ошибка,  попробуйте обновить странциу или   повторите попытку позже";
  } finally {
    isActionLoading.value = false;
  }
};

const clearAllAttendance = async () => {
  try {
    if (!confirm("Вы уверены что хотите очистить все пропуски? ")) return;
    isActionLoading.value = true;
    await $fetch("/api/attendance/" + authStore.currentUser?.groupId, {
      method: "DELETE",
    });
    await refreshAttendace();
  } catch (error) {
    actionErrorMessage.value =
      "Ошибка при очистке посещений, повторите попытку позже!";
  } finally {
    isActionLoading.value = false;
  }
};
</script>

<style scoped></style>
