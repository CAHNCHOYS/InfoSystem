<template>
  <v-footer
    :app="true"
    height="auto"
    color="#17213C"
    class="d-flex flex-column"
  >
    <div class="py-2">
      <v-row justify="center">
        <v-col cols="auto">
          <nuxt-link class="d-flex align-center" to="/">
            <v-img class="pr-2">
              <v-img
                :src="config.public.images + '/Header/students.png'"
                width="30"
                height="30"
                cover
                class="rounded-circle"
              />
            </v-img>

            <div class="text-white">Главная</div>
          </nuxt-link>
        </v-col>

        <v-col v-for="{ link, text } in menuItems" cols="auto" :key="link">
          <nuxt-link :to="link" class="text-white footer-link text-subtitle-1">
            {{ text }}
          </nuxt-link>
        </v-col>
      </v-row>
    </div>


    <div class="text-center text-subtitle-2 text-white pb-2 d-sm-block d-none">
      Разработчик:  Студент гр. ПИ-19Г
      <span class="font-weight-bold">Седых Алексей</span>
    </div>

    <div class="text-center text-subtitle-2 text-white">
      2023 - <span class="font-weight-bold">ДонНТУ</span>

      <nuxt-link
        class="text-white"
        to="https://github.com/CAHNCHOYS/InfoSystem"
        target="_blank"
      >
        <v-icon class="pl-2" icon="mdi-github"
      /></nuxt-link>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const menuItems = ref([
  {
    text: "Студенты",
    link: "/students",
  },
  {
    text: "Расписание",
    link: "/schedule",
  },
  {
    text: "Посещаемость",
    link: "/attendance",
  },
  {
    text: "Расписание сессии",
    link: "/exams",
  },
]);
</script>

<style scoped>
.footer-link {
  transition: all 0.5s ease 0s;
}

.footer-link:hover {
  color: coral !important;
}
</style>
