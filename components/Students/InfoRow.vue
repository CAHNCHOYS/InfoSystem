<template>
  <tr :class="[isSelected ? 'bg-blue-grey-lighten-5' : '']">
    <td class="pr-7">
      <v-checkbox v-model="isSelected" color="light-blue" />
    </td>
    <td
      class="w-100 pl-4"
      @click.self="isSelected = !isSelected"
      style="cursor: pointer"
    >
      {{ student.fullName }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { IStudent } from "~/types/core";

const props = defineProps<{
  student: IStudent;
  cancelSelection?: boolean;
}>();

const emit = defineEmits<{
  (e: "selectStudent", studentId: number, checked: boolean): void;
}>();

const isSelected = ref(false);

watch(isSelected, () => {
  emit("selectStudent", props.student.id, isSelected.value);
});

watch(
  () => props.cancelSelection,
  () => {
    if (props.cancelSelection) isSelected.value = false;
  }
);
</script>

<style scoped></style>
