export default defineEventHandler((event) => {
  deleteCookie(event, "token");

  return "logged out";
});
