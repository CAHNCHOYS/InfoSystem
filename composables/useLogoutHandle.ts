export const useLogoutHangler = (pagePath: string) => {
  const handleLogout = async () => {
    try {
      await $fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      console.log(pagePath);
      await navigateTo({
        path: "/auth/login",
        query: {
          isTokenExpired: "true",
          redirectedFrom: pagePath,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogout };
};
