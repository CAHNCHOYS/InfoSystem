import { verifyAccessToken } from "../services/tokens";

export default defineEventHandler((event) => {
  console.log(event.path, "path");
  // const path = event.path;
  // if (path === "/api/auth/user" || path==="/api/students") {
  //   try {
  //     console.log("verifiin token from backend");

  //     const token = getCookie(event, "token")!;

  //     if (!token) throw new Error();

  //     const decodedToken = verifyAccessToken(token);
  //     console.log(decodedToken, "token");
  //     event.context.authUser = decodedToken;
  //   } catch (error) {
  //     throw createError({
  //       statusCode: 401,
  //       message: "Не авторизирован!",
  //     });
  //   }
  // }
});
