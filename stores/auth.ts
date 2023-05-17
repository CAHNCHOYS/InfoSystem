import { IStarostaUser, IStudentUser } from "~/types/core";

export const useAuthStore = defineStore("authStore", () => {
  const currentUser = ref<IStudentUser | IStarostaUser | null>(null);

  const isUserLoggedIn = ref(false);

  function setUser(user: IStarostaUser | IStudentUser) {
    currentUser.value = user;
    isUserLoggedIn.value = true;
  }

  async function getUser() {
    const { data, error } = await useFetch<IStarostaUser | IStudentUser>(
      "/api/auth/user",
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (data.value) {
      setUser(data.value);
    }
  }

  async function logOutUser() {
    try {
      await $fetch("/api/auth/logout", {
        credentials: "include",
      });
      isUserLoggedIn.value = false;
      currentUser.value = null;
    } catch (error) {
      throw error;
    }
  }

  return {
    isUserLoggedIn,
    currentUser,
    setUser,
    getUser,
    logOutUser,
  };
});
