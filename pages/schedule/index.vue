<template>
  <h3 class="text-sm-h4 text-h5 mb-7">Расписание группы на текущий семестр</h3>
  <v-card
    color="white"
    elevation="4"
    class="pa-md-5 pa-2 mx-sm-0 mx-n3"
    v-if="!scheduleFetchError"
  >
    <v-card-title
      class="text-wrap text-h6 d-flex justify-space-between align-center"
    >
      <div class="flex-auto pr-2">
        <v-switch
          color="blue-grey"
          v-model="currentWeek"
          true-value="Верхняя"
          false-value="Нижняя"
          class="px-2"
        >
          <template #label>
            <p class="text-h6 text-black">
              Текущая неделя:
              <span class="font-weight-bold"> {{ currentWeek }}</span>
            </p>
          </template>
        </v-switch>
      </div>
      <div class="flex-shrink-0" v-if="!xs">
        <v-btn
          @click="activateGridColumns"
          icon="mdi-view-grid-outline"
          :color="isGridActive ? 'indigo' : 'black'"
          variant="text"
        />
        <v-btn
          @click="activateListColumns"
          icon="mdi-view-list-outline"
          :color="isListActive ? 'indigo' : 'black'"
          variant="text"
        />
      </div>
    </v-card-title>

    <v-card-text>
      <v-row class="mb-2">
        <v-col
          v-for="{ icon, day, isLoading, error } in scheduleCols"
          :sm="isGridActive ? 6 : 12"
          cols="12"
          :key="day"
        >
          <v-sheet height="65" color="blue-grey" class="pa-4">
            <h3 class="text-h6">{{ day }} <v-icon :icon="icon" /></h3>
          </v-sheet>
          <div v-if="!isLoading && !error">
            <ScheduleClass
              v-for="n in 6"
              :schedule-class="findClassByDayAndOrder(day, n)"
              :week-type="currentWeek"
              :order="n"
              :is-edit-allowed="authStore.currentUser?.role === 'староста'"
              @handle-schedule-update="updateSchedule"
              @handle-schedule-add="
                (className, weekType) =>
                  addSchedule(className, weekType, day, n)
              "
              :key="n"
            />
          </div>
          <div class="border-sm d-flex justify-center pa-5" v-else-if="!error">
            <v-progress-circular indeterminate color="indigo" size="64" />
          </div>

          <v-alert rounded="0" type="error" v-else>
            <p class="text-h6">{{ error }}</p>
          </v-alert>
        </v-col>
      </v-row>
      <div v-if="authStore.currentUser?.role === 'староста'">
        <v-btn
          @click="deleteAllSchedule"
          variant="flat"
          color="error"
          class="px-5"
          append-icon="mdi-trash-can"
        >
          Очистить расписание
        </v-btn>
      </div>
    </v-card-text>
  </v-card>

  <v-alert type="error" v-else>
    <p class="text-h6">
      При загрузке расписания произошла ошибка, возможно база данных недоступна,
      повторите попытку позже или обновите страницу
    </p>
  </v-alert>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useAuthStore } from "~/stores/auth";
import type { ISchedule, WeekDays, WeekType } from "~/types/core";

definePageMeta({
  middleware: "check-auth",
});

const authStore = useAuthStore();

const {
  data: schedule,
  refresh: refreshSchedule,
  error: scheduleFetchError,
} = await useFetch<ISchedule[]>(
  "/api/schedule/" + authStore.currentUser!.groupId,
  { method: "GET" }
);

const { xs } = useDisplay();

//Столбцы расписания ---------------------------------------------------
type ScheduleCol = {
  day: WeekDays;
  icon: string;
  isLoading: boolean;
  error: string | null;
};
const scheduleCols = ref<ScheduleCol[]>([
  {
    day: "Понедельник",
    icon: "mdi-emoticon-dead",
    isLoading: false,
    error: null,
  },
  {
    day: "Вторник",
    icon: "mdi-emoticon-cry",
    isLoading: false,
    error: null,
  },
  {
    day: "Среда",
    icon: "mdi-emoticon-sad",
    isLoading: false,
    error: null,
  },
  {
    day: "Четверг",
    icon: "mdi-emoticon-excited",
    isLoading: false,
    error: null,
  },
  {
    day: "Пятница",
    icon: "mdi-emoticon-cool",
    isLoading: false,
    error: null,
  },
]);

const isGridActive = ref(true);
const isListActive = ref(false);

const activateGridColumns = () => {
  isListActive.value = false;
  isGridActive.value = true;
};

const activateListColumns = () => {
  isGridActive.value = false;
  isListActive.value = true;
};

//--------------------------------------------------------------------

//Работа с расписанием ----------------------------------------------

const currentWeek = ref<WeekType>("Верхняя");

const findClassByDayAndOrder = computed(() => {
  return function (day: WeekDays, order: number) {
    return schedule.value?.find(
      (scheduleDay) =>
        scheduleDay.day === day &&
        scheduleDay.classOrder === order &&
        (scheduleDay.weekType === "Обе" ||
          scheduleDay.weekType === currentWeek.value)
    );
  };
});

const updateSchedule = async (newSchedule: ISchedule) => {
  const currentCol = scheduleCols.value.find(
    (col) => col.day === newSchedule.day
  )!;
  try {
    currentCol.isLoading = true;
    await $fetch("/api/schedule", {
      method: "PATCH",
      body: {
        ...newSchedule,
        groupId: authStore.currentUser!.groupId,
      },
    });
    await refreshSchedule();
  } catch (error) {
    currentCol.error =
      "Ошикба при обновлении расписания, попробуйте обновить страницу или повторить попытку позже!";
    setTimeout(() => (currentCol.error = null), 2500);
  } finally {
    currentCol.isLoading = false;
  }
};

const addSchedule = async (
  className: string,
  weekType: WeekType,
  day: WeekDays,
  order: number
) => {
  const currentCol = scheduleCols.value.find((col) => col.day === day)!;
  try {
    currentCol.isLoading = true;
    await $fetch("/api/schedule", {
      method: "POST",
      body: {
        className,
        day,
        order,
        weekType,
        groupId: authStore.currentUser!.groupId,
      },
    });
    await refreshSchedule();
  } catch (error) {
    currentCol.error =
      "Ошикба при добавлении расписания, попробуйте обновить страницу или повторить попытку позже!";
    setTimeout(() => (currentCol.error = null), 2500);
  } finally {
    currentCol.isLoading = false;
  }
};

const deleteAllSchedule = async () => {
  if (
    !confirm(
      "Вы уверены что хотите очистить все расписние, придется заполнять его снова!"
    )
  )
    return;
  try {
    await $fetch("/api/schedule/" + authStore.currentUser?.groupId, {
      method: "DELETE",
    });
    await refreshSchedule();
  } catch (error) {
    console.log(error);
  }
};
//------------------------------------------------------------------------
</script>

<style scoped></style>
