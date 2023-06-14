export default defineNuxtRouteMiddleware((to, from) => {
  const routeTime = useLastRouteTime();
  console.log(new Date().getTime());
  if (new Date().getTime() - routeTime.value < 1000) {
    return navigateTo(from.fullPath || "/");
  }
  routeTime.value = new Date().getTime();
});
