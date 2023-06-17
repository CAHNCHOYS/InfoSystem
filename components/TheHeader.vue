<template>
  <v-app-bar
    :height="smAndDown ? 65 : 80"
    color="deep-purple-darken-2"
    style="position: fixed"
    class="px-4"
  >
    <div>
      <nuxt-link class="text-white" to="/">
        <v-img
          :src="config.public.images + '/Header/students.png'"
          :width="smAndDown ? 45 : 55"
          :height="smAndDown ? 45 : 55"
          cover
          class="rounded-circle"
        />
      </nuxt-link>
    </div>

    <v-spacer />

    <v-divider vertical class="mr-1"></v-divider>

    <nuxt-link
      to="/auth/login"
      class="text-white auth-link text-uppercase text-subtitle-2"
      v-if="!authStore.isUserLoggedIn"
    >
      <v-btn append-icon="mdi-login"> Войти </v-btn>
    </nuxt-link>

    <AccountPopoverMenu
      v-if="authStore.currentUser"
      :user="authStore.currentUser"
      @logout="handleLogout"
    />

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
      <v-col v-for="menuItem in menuItems" :key="menuItem.link" cols="auto">
        <nuxt-link
          class="text-white link"
          active-class="active-link"
          :to="menuItem.link"
        >
          <v-btn
            :append-icon="menuItem.icon"
            class="text-subtitle-2 text-uppercase"
          >
            {{ menuItem.text }}</v-btn
          ></nuxt-link
        >
      </v-col>
    </v-row>
  </v-app-bar>

  <TheMobileMenu
    :menu-items="menuItems"
    @close-menu="isMenuActive = false"
    :is-active="isMenuActive"
  />
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
  icon?: string;
};

const menuItems = ref<MenuItem[]>([
  {
    text: "Студенты",
    link: "/students",
    icon: "mdi-account-school",
  },

  {
    text: "Расписание занятий",
    link: "/schedule",
    icon: "mdi-clock-outline",
  },

  {
    text: "Посещаемость",
    link: "/attendance",
    icon: "mdi-newspaper",
  },
  {
    text: "Сессия",
    link: "/exams",
    icon: "mdi-ab-testing",
  },
]);

const isMenuActive = ref(false);

const handleLogout = async () => {
  await authStore.logOutUser();
  await navigateTo("/");
};
</script>

<style scoped>
.active-link button {
  background-color: #b388ff60;
}
</style>
