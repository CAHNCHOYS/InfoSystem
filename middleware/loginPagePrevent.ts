import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.isUserLoggedIn) {
    if(to.fullPath === from.fullPath) return navigateTo("/");
    return navigateTo(from.fullPath);
  }
});
