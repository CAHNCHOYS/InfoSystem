<template>
  <v-layout>
    <TheHeader />
    <v-main>
      <!----- Site content ------>
      <v-container class="mx-auto px-md-5 px-3 py-md-10 py-6">
        <slot> </slot>
      </v-container>
    </v-main>
    <TheFooter />
  </v-layout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
