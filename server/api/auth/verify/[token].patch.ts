import jwt, { type JwtPayload } from "jsonwebtoken";
import { verifyActivationToken } from "~/server/services/tokens";
import { dbPool } from "~/server/plugins/database";

//Подтверждение email и активация аккунта
export default defineEventHandler(async (event) => {
  try {
    const { token } = event.context.params!;

    const decoded = verifyActivationToken(token);

    const [rows] = await dbPool.query(
      `UPDATE starosti set isActivated = 1 WHERE starosti.email = '${
        (decoded as JwtPayload).email
      }'`
    );

    return { isActivated: true };
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.NotBeforeError
    ) {
      throw createError({
        statusCode: 400,
        message: "Invalid jwt",
      });
    }
    throw createError({
      statusCode: 500,
      message: "server error",
    });
  }
});
