<template>
  <v-layout>
    <v-app-bar height="80" color="pink">
      <v-app-bar-title>
        <nuxt-link class="text-white" to="/">Справочная система</nuxt-link>
      </v-app-bar-title>

      <v-spacer>  </v-spacer>
      <v-divider vertical></v-divider>

      

      <v-row justify="end" class="flex-grow-0" v-if="authStore.isUserLoggedIn">
        <v-col cols="auto" v-for="menuItem in menuItems" :key="menuItem.link">
          <v-btn @click="goTo(menuItem.link)"> {{ menuItem.text }}</v-btn>
        </v-col>

      </v-row>
      <v-btn v-else>Войти </v-btn>
    </v-app-bar>
    <v-main>
      <!----- Site content ------>
      <v-container class="mx-auto px-md-5 px-3 py-10">
        <div>
          <slot> </slot>
        </div>
      </v-container>
    </v-main>
    <v-footer color="black" :app="true" height="80"> Подвал сайта </v-footer>
  </v-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

type MenuItem = {
  text: string;
  link: string;
};

const menuItems = ref<MenuItem[]>([
  {
    text: "Студенты группы",
    link: "/students",
  },

  {
    text: "Расписание занятий",
    link: authStore.currentUser?.groupName +  "-schedule" ,
  },

  {
    text: "Расписание сессии",
    link: "/students",
  },
]);

const goTo = async (link: string) => {
  await navigateTo(link);
};
</script>

<style scoped>
.container {
  max-width: 1400px !important;
}
</style>
