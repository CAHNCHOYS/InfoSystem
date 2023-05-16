import { IStarostaUser, IStudentUser } from "~/types/core";
import { GetUserResponse } from "~/types/responses";

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

  function logOutUser() {
    
  }

  return {
    isUserLoggedIn,
    currentUser,
    setUser,
    getUser,
  };
});
