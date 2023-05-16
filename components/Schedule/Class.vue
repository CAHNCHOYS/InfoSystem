<template>
  <div class="border-sm">
    <v-row no-gutters align="center" class="px-4 py-1">
      <v-col cols="auto" class="pr-4 text-h4">
        <span class="font-weight-bold">{{ order }}</span>
      </v-col>

      <v-col class="flex-grow-1 text-h6">
        <span v-if="!isUserEditing">{{
          scheduleClass?.className || "Нет пары"
        }}</span>
        <v-text-field
          v-model="newClassName"
          class="text-h6"
          @keyup.enter="emitAction"
          variant="underlined"
          :clearable="false"
          label="Введите название пары"
          color="black"
          v-else
        />
      </v-col>

      <v-col cols="auto">
        <v-btn
          @click="toggleEdit"
          :icon="
            isUserEditing ? 'mdi-pencil-off-outline' : 'mdi-pencil-outline'
          "
          variant="text"
          color="blue"
        />
        <v-btn
          v-if="isUserEditing"
          @click="emitAction"
          icon="mdi-content-save-all"
          variant="text"
          color="green"
        />
      </v-col>
    </v-row>
    <div class="d-flex align-center px-4" v-if="isUserEditing">
      <v-checkbox
        hide-details="auto"
        v-model="isCurrentWeek"
        label="Для текущей недели"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISchedule, WeekType } from "~/types/core";

const props = defineProps<{
  order: number;
  weekType: WeekType;
  scheduleClass: ISchedule | undefined;
}>();

const emit = defineEmits<{
  (e: "updateSchedule", newSchedule: ISchedule): void;
  (e: "addSchedule", className: string, week: WeekType): void;
}>();

const isUserEditing = ref(false);
const newClassName = ref(props.scheduleClass?.className || "Нет пары");
const isCurrentWeek = ref(true);

watch(
  () => props.scheduleClass,
  () => {
    newClassName.value = props.scheduleClass?.className || "Нет пары";
  }
);

const toggleEdit = () => {
  // newClassName.value = props.className;
  isUserEditing.value = !isUserEditing.value;
};

const emitAction = () => {
  if (props.scheduleClass) {
    emit("updateSchedule", {
      ...props.scheduleClass,
      className: newClassName.value,
      weekType: isCurrentWeek.value ? props.weekType : "Обе",
    });
  } else
    emit(
      "addSchedule",
      newClassName.value,
      isCurrentWeek.value ? props.weekType : "Обе"
    );
  isUserEditing.value = false;
};
</script>

<style scoped></style>
