import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (authStore.currentUser?.role != "староста") {
    return navigateTo("/auth/login/check-role");
  }
});
