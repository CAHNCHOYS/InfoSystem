<template>
  <div>
    <h1 class="text-sm-h4 text-h5 mb-5">
      Информационно-справочная система "староста и подгуппы"
    </h1>
    <!-- <div class="text-h6">Информационно справочная система</div> -->
    <v-parallax
      :height="smAndDown ? 400 : 600"
      class="parallax"
      :src="config.public.images + '/MainPage/parallax.jpg'"
    ></v-parallax>

    <section class="py-8">
      <h4 class="text-center adv-title text-h4 mb-sm-10 mb-7">
        Возможности системы
      </h4>
      <v-row class="advantage-row" justify="center">
        <v-col
          v-for="advantage in advantages"
          md="4"
          sm="6"
          cols="12"
          :key="advantage.title"
          class="advantage-col"
        >
          <v-card
            color="white"
            class="pa-5"
            rounded="0"
            height="100%"
            elevation="4"
          >
            <v-card-title class="text-center">
              <v-icon
                class="icon"
                :color="advantage.iconColor"
                :icon="advantage.icon"
              />
            </v-card-title>
            <v-card-text>
              <p class="text-h6 text-center mb-4">
                {{ advantage.title }}
              </p>

              <p class="text-subtitle-1">
                <v-list>
                  <v-list-item
                    prepend-icon="mdi-check"
                    density="compact"
                    v-for="action in advantage.advantageActions"
                  >
                    <v-list-item-title class="text-wrap">{{
                      action
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { smAndDown } = useDisplay();

gsap.registerPlugin(ScrollTrigger);

const config = useRuntimeConfig();

type AdvantageCol = {
  title: string;
  icon: string;
  iconColor: string;
  advantageActions: string[];
};

const advantages = ref<AdvantageCol[]>([
  {
    title: "Работа со студентами",
    icon: "mdi-account-school",
    iconColor: "green",
    advantageActions: [
      "Добавление студентов группы",
      "Удаление студентов из группы",
      "Просмотр информации о студентах",
      "Редактирование информации",
    ],
  },
  {
    title: "Составление расписания",
    icon: "mdi-clock-time-nine-outline",
    iconColor: "red",
    advantageActions: [
      "Заполнение расписания группы",
      "Очистка расписания",
      "Разделение на верхние и нижние недели",
    ],
  },
  {
    title: "Ведение журнала посещаемости",
    icon: "mdi-notebook",
    iconColor: "blue-grey",
    advantageActions: [
      "Заполнение пропущенных часов студентов группы",
      "Очистка журнала",
      "Редактирование журнала",
    ],
  },
  {
    title: "Создание расписания сессии",
    icon: "mdi-newspaper-variant-outline",
    iconColor: "blue",
    advantageActions: ["Добавление экзаменов", "Добавление консультаций"],
  },
]);

onMounted(() => {
  gsap.from(".parallax", {
    opacity: 0,
    duration: 2,
    ease: "back.out",
  });

  gsap.from(".adv-title", {
    x: "-300",
    opacity: 0,
    duration: 0.5,

    scrollTrigger: {
      trigger: ".adv-title",
      scrub: true,
      start: "top 60%",
      end: "+=200",
    },
  });
  gsap.from(".advantage-col", {
    duration: 0.8,
    scale: 0,
    ease: "power3.out",
    opacity: 0,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".advantage-row",
      scrub: true,
      start: "top 62%",
      end: "+=500",
    },
  });
});
</script>

<style scoped>
.icon {
  font-size: 80px !important;
}
</style>
