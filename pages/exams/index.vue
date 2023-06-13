<template>
  <div>
    <h3 class="text-sm-h3 text-h5 mb-sm-7 mb-5">Расписание сессии</h3>

    <v-card
      elevation="4"
      rounded="0"
      class="mx-sm-0 mx-n3 pa-md-6 pa-4"
      v-if="!examsFetchError"
    >
      <v-card-title class="d-flex align-center mb-4 px-0">
        <div class="flex-grow-1 text-h6 font-weight-bold text-wrap">
          Список экзаменов / консультаций
        </div>
        <div v-if="authStore.currentUser?.role === 'староста'">
          <v-tooltip
            content-class="bg-green text-center"
            location="bottom center"
            text="Добавить экзамен или консультацию"
            max-width="200"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="flat"
                color="green"
                icon="mdi-plus"
                @click="isAddDialogActive = true"
              />
            </template>
          </v-tooltip>
        </div>
      </v-card-title>
      <v-card-text class="px-0">
        <ExamsTable
          :exams="allExams || []"
          :is-starosta-user="authStore.currentUser?.role === 'староста'"
          @toggle-delete-dialog="activateDeleteDialog"
          @toggle-edit-dialog="activateEditDialog"
        />
      </v-card-text>
    </v-card>

    <div v-else>
      <v-alert type="error">
        <p class="text-h6">
          Произошла ошибка при загрузке экзаменов, повторите попытку позже или
          обновите страницу.
        </p>
      </v-alert>
    </div>

    <ExamsAddDialog
      v-model:is-opened="isAddDialogActive"
      :group-id="authStore.currentUser!.groupId"
      @update-exams="refreshExams"
    />

    <ExamsDeleteDialog
      v-model:is-opened="isDeleteDialogActive"
      :exam="examToEdit"
      @update-exams="refreshExams"
      v-if="examToEdit"
    />

    <ExamsEditDialog
      v-model:is-opened="isEditDialogActive"
      :exam="examToEdit"
      @update-exams="refreshExams"
      v-if="examToEdit"
    >
    </ExamsEditDialog>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { IGroupExam } from "~/types/core";

definePageMeta({
  middleware: "check-auth",
});

const authStore = useAuthStore();

const {
  data: allExams,
  error: examsFetchError,
  refresh: refreshExams,
} = useFetch<IGroupExam[]>("/api/exams/" + authStore.currentUser?.groupId);

const isAddDialogActive = ref(false);
const isEditDialogActive = ref(false);
const isDeleteDialogActive = ref(false);

const examToEdit = ref<IGroupExam | null>(null);

const activateDeleteDialog = (exam: IGroupExam) => {
  isDeleteDialogActive.value = true;
  examToEdit.value = exam;
};
const activateEditDialog = (exam: IGroupExam) => {
  isEditDialogActive.value = true;
  examToEdit.value = exam;
};
</script>

<style scoped></style>
