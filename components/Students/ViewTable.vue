<template>
  {{ currentUserFullName }}
  <v-table class="bg-white py-2">
    <thead>
      <tr class="text-left d-sm-table-row d-none">
        <th v-for="header in tableHeaders">
          <span class="text-h6 font-weight-bold"> {{ header }}</span>
        </th>
      </tr>
    </thead>
    <tbody class="py-5">
      <tr
        v-for="student in students"
        :key="student.id"
        class="text-subtitle-2"
        :class="
          [currentUserFullName === student.fullName ? 'font-weight-bold' : ''] 
        "
      >
        <td class="d-sm-table-cell d-flex h-auto py-3">
          <div class="d-sm-none d-block font-weight-bold pr-2 flex-grow-1">
            Имя:
          </div>
          <div class="text-sm-left text-right">{{ student.fullName }}</div>
        </td>
        <td class="d-sm-table-cell d-flex h-auto py-3">
          <div class="d-sm-none d-block font-weight-bold pr-2 flex-grow-1">
            Адрес:
          </div>
          <div class="text-sm-left text-right">{{ student.address }}</div>
        </td>
        <td class="d-sm-table-cell d-flex h-auto py-3">
          <div class="d-sm-none d-block font-weight-bold pr-2 flex-grow-1">
            Телефон:
          </div>
          <div class="text-sm-left text-right">{{ student.phone }}</div>
        </td>
        <td class="d-sm-table-cell d-flex h-auto py-3">
          <div class="d-sm-none d-block font-weight-bold pr-2 flex-grow-1">
            Дата рождения:
          </div>
          <div class="text-sm-left text-right">{{ student.dateOfBirth }}</div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { IStudent } from "~/types/core";

const props = defineProps<{
  students: IStudent[];
  currentUserFullName: string;
}>();

const tableHeaders = ref(["Имя", "Адрес", "Телефон", "Дата рождения"]);
</script>

<style scoped>
@media (max-width: 600px) {
  td {
    border-bottom: none !important;
  }
  tr:not(:last-child) {
    border-bottom: 1px solid #111 !important;
    display: block;

    padding: 0px 0px 10px 0px;
  }
}
</style>
