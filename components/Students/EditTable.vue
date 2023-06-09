<template>
  <v-toolbar
    height="70"
    :color="getSelectedStudentsLength ? 'grey-darken-4' : 'blue-grey-lighten-4'"
    class="px-4 mb-2"
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
      <p class="d-sm-block d-none" v-else>
        Выбрано: {{ getSelectedStudentsLength }}
      </p>
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
      text="Удалить выбранных студентов"
      content-class="bg-red text-white"
      location="bottom center"
      v-if="getSelectedStudentsLength"
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
          <v-btn icon="mdi-plus" color="green-darken-3" />
        </nuxt-link>
      </template>
    </v-tooltip>
  </v-toolbar>

  <v-slide-y-transition>
    <v-alert type="error" class="mx-5" v-if="isDeleteError">
      <p class="text-h6">
        Ошибка при удалении студента, повторите попытку позже.
      </p>
    </v-alert>
  </v-slide-y-transition>
  <v-table density="comfortable" v-if="students.length">
    <thead>
      <tr>
        <th class="text-h6 text-left text-black"></th>
        <th class="text-left text-h6 text-black">Имя студента</th>
      </tr>
    </thead>
    <tbody>
      <transition-group
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <StudentsInfoRow
          v-for="student in students"
          :key="student.id"
          :student="student"
          :cancel-selection="removeSelection"
          @select-student="selectStudents"
        />
      </transition-group>
    </tbody>
  </v-table>

  <p class="text-h6 px-4" v-else>
    Вы пока не добавили студентов в группу, нажмите на плюсик сверху, чтобы
    приступить к добавлению
  </p>
</template>

<script setup lang="ts">
import type { IStudent } from "~/types/core";

const props = defineProps<{
  students: IStudent[];
  groupName: string;
}>();

const emit = defineEmits<{
  (e: "deleteStudents", studentIds: number[]): void;
}>();

const selectedStudents = ref<number[]>([]);
const removeSelection = ref(false);

const isDeletingLoading = ref(false);
const isDeleteError = ref(false);

const getSelectedStudentsLength = computed(() => selectedStudents.value.length);

const selectStudents = (studentId: number, isSelected: boolean) => {
  removeSelection.value = false;
  if (isSelected) {
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
    for (const id of selectedStudents.value) {
      await $fetch("/api/students/" + id, {
        method: "delete",
        credentials: "include",
      });
    }
    emit("deleteStudents", selectedStudents.value);
    selectedStudents.value = [];
    removeSelection.value = true;
  } catch (error) {
    isDeleteError.value = true;
    setTimeout(() => (isDeleteError.value = false), 2500);
  } finally {
    isDeletingLoading.value = false;
  }
};

const { beforeEnter, enter, leave } = useListAnimations();
</script>

<style scoped></style>
