<template>
  <div class="border-sm px-4 py-1">
    <v-row no-gutters align="center">
      <v-col cols="auto" class="pr-4 text-h4">
        <span class="font-weight-bold"> {{ order }}</span>
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
          v-if="isEditAllowed"
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
      <v-checkbox hide-details="auto" v-model="isCurrentWeek" color="black" >
        <template #label>
          <span class="text-high-emphasis text-subtitle-1 font-weight-bold" 
            >Для текущей недели</span
          >
        </template>
      </v-checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISchedule, WeekType } from "~/types/core";

const props = defineProps<{
  order: number;
  weekType: WeekType;
  scheduleClass: ISchedule | undefined;
  isEditAllowed: boolean;
}>();

const emit = defineEmits<{
  (e: "handleScheduleUpdate", newSchedule: ISchedule): void;
  (e: "handleScheduleAdd", className: string, week: WeekType): void;
}>();

const isUserEditing = ref(false);
const isCurrentWeek = ref(true);
const newClassName = ref(props.scheduleClass?.className || "Нет пары");

watch(
  () => props.scheduleClass,
  () => {
    newClassName.value = props.scheduleClass?.className || "Нет пары";
  }
);

const toggleEdit = () => {
  newClassName.value = props.scheduleClass?.className || "Нет пары";
  isUserEditing.value = !isUserEditing.value;
};

const emitAction = () => {
  if (props.scheduleClass) {
    emit("handleScheduleUpdate", {
      ...props.scheduleClass,
      className: newClassName.value,
      weekType: isCurrentWeek.value ? props.weekType : "Обе",
    });
  } else
    emit(
      "handleScheduleAdd",
      newClassName.value,
      isCurrentWeek.value ? props.weekType : "Обе"
    );
  isUserEditing.value = false;
};
</script>

<style lang="scss" scoped>


</style>
