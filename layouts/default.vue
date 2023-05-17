<template>
  <v-layout>
    <TheHeader />
    <v-main>
      <!----- Site content ------>
      <v-container class="mx-auto px-md-5 px-3 py-10">
        <div>
          <slot> </slot>
        </div>
      </v-container>
    </v-main>
    <TheFooter />
  </v-layout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
