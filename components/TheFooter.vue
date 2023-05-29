<template>
  <v-footer
    :app="true"
    height="auto"
    color="#17213C"
    class="d-flex flex-column"
  >
    <v-container class="pa-0 py-2">
      <v-row align="center" class="text-white" no-gutters>
        <v-col class="flex-grow-1 pr-1 d-flex">
          <div class="pr-1">
            <v-img
              :src="config.public.images + '/Header/students.png'"
              width="30"
              height="30"
              cover
              class="rounded-circle"
            />
          </div>
          <div class="flex-grow-1">
            <span class="text-subtitle-1">
              Информационно справочная система "Старосты и подгруппы"
            </span>
          </div>
        </v-col>
        <v-col sm="auto" cols="12" class="text-sm-left text-center">
          Автор:
          <nuxt-link to="https://github.com/CAHNCHOYS" target="_blank">
            <v-btn variant="plain" class="text-white" icon="mdi-github" />
          </nuxt-link>

          <nuxt-link to="https://github.com/CAHNCHOYS" target="_blank">
            <v-btn variant="text" class="text-white rounded-circle">
              <v-img
                :src="config.public.images + '/Footer/Telega.png'"
                width="32"
                height="32"
              />
            </v-btn>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>

    <div class="text-center text-subtitle-1 text-white">
      2023 - <span class="font-weight-bold">ДонНТУ</span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const icons = ref(["mdi-github"]);
</script>

<style scoped></style>
