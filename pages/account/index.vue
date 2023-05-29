<template>
  <h3 class="text-sm-h4 text-h5 mb-7">Информация об аккаунте</h3>
 
  <p>{{ authStore.currentUser }}</p>
  <v-card color="white" elevation="4" class="pa-md-5 pa-2 mx-sm-0 mx-n3">
    <v-card-actions>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Имя"> </v-text-field>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
definePageMeta({
  middleware: "check-auth",
});

const authStore = useAuthStore();

const { updateStarostaInfoSchema } = useFormSchemas();
const initialFormValues = computed(()=> {
     
});

const { handleSubmit, isSubmitting } = useForm({
    validationSchema: updateStarostaInfoSchema,
});





</script>

<style scoped></style>
