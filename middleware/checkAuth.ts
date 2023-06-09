import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  console.log("checking auth");
  if (!authStore.isUserLoggedIn) {
    return navigateTo({
      path: "/auth/login",
      query: {
        isLoginRequired: "true",
        redirectedFrom: to.fullPath,
      },
    });
  }
});
