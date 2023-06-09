import { useAuthStore } from "~/stores/auth";
import { useGroupStudentsStore } from "~/stores/groupStudents";

export default defineNuxtPlugin(async (nuxt) => {
  const authStore = useAuthStore();
  const groupStudentsStore = useGroupStudentsStore();

  //  console.log(authStore.isUserLoggedIn, "checkLogin2");

  await authStore.getUser();
  if (authStore.currentUser) {
    await groupStudentsStore.getAllGroupStudents(authStore.currentUser.groupId);
  }

  //  console.log(groupStudentsStore.students, "students");

  // console.log(authStore.isUserLoggedIn, "checkLoginAfter");
});
