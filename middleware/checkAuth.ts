import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  // console.log(to.fullPath, "path");

  // console.log(from.fullPath, "path");

  // console.log(to.name, "name");
  // console.log(from.name, "name");

  console.log(to.name);
  console.log(to.fullPath);
  if (!authStore.isUserLoggedIn) {
    console.log("true");
    return navigateTo({
      path: "/auth/login",
      query: {
        isLoginRequired: "true",
        redirectedFrom: to.fullPath,
      },
    });
  }
});
