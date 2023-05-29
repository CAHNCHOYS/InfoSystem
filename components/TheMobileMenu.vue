<template>
  <v-navigation-drawer
    :model-value="isActive"
    @update:model-value="$emit('closeMenu')"
    class="h-100 pt-16 pb-5 px-2 overflow-auto"
    temporary
    permanent
    location="bottom"
    style="position: fixed"
  >
    <v-list>
      <v-list-item
        v-for="menuItem in menuItems"
        :key="menuItem.link"
        :value="menuItem.link"
        :prepend-icon="menuItem.icon"
      >
        <v-list-item-title class="text-h6">
          <nuxt-link
            @click="$emit('closeMenu')"
            class="text-black d-block"
            :to="menuItem.link"
          >
            {{ menuItem.text }}
          </nuxt-link></v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
type MenuItem = {
  text: string;
  icon?: string;
  link: string;
};
const props = defineProps<{
  menuItems: MenuItem[];
  isActive: boolean;
}>();
const emit = defineEmits<{
  (e: "closeMenu"): void;
}>();
</script>

<style scoped></style>
