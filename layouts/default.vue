<template>
  <v-layout>
    <v-main>
      <v-app-bar height="60" color="pink">
        <v-app-bar-title>Справочная система</v-app-bar-title>
      </v-app-bar>

      <!----- Site content ------>
      <slot > </slot>

      <v-footer color="black" :app="true">Footer</v-footer>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
