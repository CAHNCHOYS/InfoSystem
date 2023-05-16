import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(async (nuxt) => {
  const authStore = useAuthStore();

  console.log(authStore.isUserLoggedIn, "checkLogin");

  await authStore.getUser();

  console.log(authStore.isUserLoggedIn, "checkLoginAfter");
});
