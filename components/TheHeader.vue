<template>
  <v-app-bar :height="smAndDown ? 70 : 80" color="indigo">
    <v-app-bar-title>
      <nuxt-link class="text-white" to="/">Система sdf swdf sdf sdf sd  </nuxt-link>
    </v-app-bar-title>

    <v-spacer> </v-spacer>

    <v-divider vertical class="mr-1"></v-divider>

    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn v-bind="props">Аккаунт</v-btn>
      </template>

      <v-list rounded="0" min-width="300" density="comfortable" class="bg-white">
        <v-list-item >
          <v-list-item-title>
            {{ authStore.currentUser?.groupName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Роль: {{ authStore.currentUser?.role }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider thickness="1" class="mt-2"> </v-divider>

        <v-list-item  to="/students" prepend-icon="mdi-account" value="аккаунт">
          <v-list-item-title> Аккаунт </v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogout" prepend-icon="mdi-exit-run">
          <v-list-item-title>Выйти</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      icon="mdi-menu"
      @click="isMenuActive = true"
      v-if="smAndDown && !isMenuActive"
    >
    </v-btn>
    <v-btn
      icon="mdi-close"
      @click="isMenuActive = false"
      v-if="smAndDown && isMenuActive"
    >
    </v-btn>

    <v-row v-if="!smAndDown" justify="end" class="flex-grow-0" no-gutters>
      <v-col cols="auto" v-for="menuItem in menuItems" :key="menuItem.link">
        <nuxt-link class="text-white" :to="menuItem.link">
          <v-btn> {{ menuItem.text }}</v-btn></nuxt-link
        >
      </v-col>
    </v-row>
  </v-app-bar>

  <v-navigation-drawer
    v-model="isMenuActive"
    class="h-100 py-16 px-2"
    temporary
    location="bottom"
  >
    <v-list>
      <v-list-item
        v-for="menuItem in menuItems"
        :key="menuItem.link"
        :value="menuItem.link"
      >
        <v-list-item-title class="text-h6">
          <nuxt-link class="text-black d-block" :to="menuItem.link">
            {{ menuItem.text }}
          </nuxt-link></v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useAuthStore } from "~/stores/auth";

const config = useRuntimeConfig();

const { smAndDown } = useDisplay();

const authStore = useAuthStore();

type MenuItem = {
  text: string;
  link: string;
};

const menuItems = ref<MenuItem[]>([
  {
    text: "Студенты",
    link: "/students",
  },

  {
    text: "Расписание",
    link: authStore.currentUser?.groupName + "-schedule",
  },

  {
    text: "Расписание сессии",
    link: "/students",
  },
  {
    text: "Посещаемость",
    link: "/students",
  },
]);

const isMenuActive = ref(false);

const handleLogout = async () => {
  await authStore.logOutUser();
  await navigateTo("/");
};
</script>

<style scoped></style>
