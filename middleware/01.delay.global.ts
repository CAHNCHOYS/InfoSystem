export default defineNuxtRouteMiddleware((to, from) => {
  const routeTime = useLastRouteTime();
  console.log(from.name);
  console.log(to.name);
  if (new Date().getTime() - routeTime.value < 700 && to.name != "auth-login") {
    console.log("YES");
    return navigateTo(from.fullPath || "/");
  }
  routeTime.value = new Date().getTime();
});
