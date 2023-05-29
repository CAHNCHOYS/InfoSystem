<template>
  <v-menu :close-on-content-click="false" max-width="500">
    <template #activator="{ props }">
      <v-btn v-bind="props">Аккаунт</v-btn>
    </template>

    <v-list rounded="0" min-width="300" density="comfortable" class="bg-white">
      <v-list-subheader class="text-h6 text-black text-wrap">{{
        user.fullName
      }}</v-list-subheader>
      <v-list-item>
        <v-list-item-title> Группа: {{ user.groupName }} </v-list-item-title>
        <v-list-item-subtitle class="text-black">
          Роль: <span class="font-weight-bold">{{ user.role }}</span>
        </v-list-item-subtitle>
      </v-list-item>
      <v-divider thickness="2" class="mt-2"> </v-divider>
      <v-list-item @click="$emit('logout')" prepend-icon="mdi-exit-run">
        <v-list-item-title>Выйти</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { IStarostaUser, IStudentUser } from "~/types/core";

const props = defineProps<{
  user: IStarostaUser | IStudentUser;
}>();

const emit = defineEmits<{
  (e: "logout"): void;
}>();
</script>

<style scoped></style>
