<template>
  <div>
    <v-toolbar
      height="70"
      :color="
        getSelectedStudentsLength ? 'grey-darken-4' : 'blue-grey-lighten-5'
      "
      class="px-4 mb-4"
    >
      <v-btn
        icon="mdi-close"
        v-if="getSelectedStudentsLength"
        @click="clearSelection"
      />

      <v-toolbar-title сlass="text-h6" class="text-wrap overflow-auto">
        <p v-if="!getSelectedStudentsLength">
          <span class="font-weight-bold"> {{ groupName }}</span>
        </p>
        <p v-else>Выбрано: {{ getSelectedStudentsLength }}</p>
      </v-toolbar-title>

      <v-spacer> </v-spacer>

      <v-tooltip
        text="Редактировать"
        content-class="bg-blue text-white"
        location="bottom center"
      >
        <template v-slot:activator="{ props }">
          <v-scale-transition>
            <nuxt-link
              v-bind="props"
              :to="'/students/edit/' + selectedStudents[0]"
              v-if="getSelectedStudentsLength"
            >
              <v-btn icon="mdi-pencil" color="blue" />
            </nuxt-link>
          </v-scale-transition>
        </template>
      </v-tooltip>

      <v-tooltip
        text="Удалить выделенное"
        content-class="bg-red text-white"
        location="bottom center"
      >
        <template #activator="{ props }">
          <v-scale-transition>
            <div v-bind="props" v-if="getSelectedStudentsLength">
              <v-badge
                color="red"
                :content="selectedStudents.length"
                offset-x="10"
                offset-y="10"
              >
                <v-btn
                  @click="deleteSelectedStudents"
                  icon="mdi-delete"
                  :loading="isDeletingLoading"
                  color="red"
                />
              </v-badge>
            </div>
          </v-scale-transition>
        </template>
      </v-tooltip>

      <v-tooltip
        text="Перейти к добавлению студента"
        location="bottom center"
        content-class="bg-green text-white"
      >
        <template v-slot:activator="{ props }">
          <nuxt-link to="/students/add" v-bind="props">
            <v-btn icon="mdi-plus" color="light-green" />
          </nuxt-link>
        </template>
      </v-tooltip>
    </v-toolbar>

    <div v-if="students?.length" class="mb-5 px-5">
      <v-table density="comfortable">
        <thead>
          <tr>
            <th class="text-h6 text-left text-black"></th>
            <th class="text-left text-h6 text-black">Имя студента</th>
          </tr>
        </thead>
        <tbody>
          <StudentsRow
            v-for="student in students"
            :key="student.id"
            :student="student"
            :cancel-selection="removeSelection"
            @select-student="updateSelectedStudents"
          />
        </tbody>
      </v-table>
    </div>

    <div class="text-h5 mb-4" v-else>
      Вы пока не добавляли студентов в группу. Добавьте кликнув на плюсик выше !
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IStudent } from "~/types/core";

const props = defineProps<{
  students: IStudent[] | null;
  groupName: string;
}>();

const emit = defineEmits<{
  (e: "refreshData"): void;
}>();

//Удаление студентов ------------------------------------------
const selectedStudents = ref<number[]>([]);
const removeSelection = ref(false);
const isDeletingLoading = ref(false);

const isDeleteSuccess = ref(false);
const deleteErrorMessage = ref<string | null>(null);

const getSelectedStudentsLength = computed(() => selectedStudents.value.length);

const updateSelectedStudents = (studentId: number, checked: boolean) => {
  removeSelection.value = false;
  if (checked) {
    selectedStudents.value.push(studentId);
  } else {
    selectedStudents.value = selectedStudents.value.filter(
      (id) => id !== studentId
    );
  }
};

const clearSelection = () => {
  selectedStudents.value = [];
  removeSelection.value = true;
};

const deleteSelectedStudents = async () => {
  try {
    isDeletingLoading.value = true;

    // await new Promise((res)=> {
    //   setTimeout(()=> res("done"),2500);
    // });
    for (const id of selectedStudents.value) {
      await $fetch("/api/students/" + id, {
        method: "delete",
        credentials: "include",
      });
    }
    emit("refreshData");
    isDeleteSuccess.value = true;
    selectedStudents.value = [];
    removeSelection.value = true;
  } catch (error) {
    console.log(error);
  } finally {
    isDeletingLoading.value = false;
  }
};
</script>

<style scoped></style>
