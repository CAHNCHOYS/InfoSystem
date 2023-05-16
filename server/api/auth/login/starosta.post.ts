import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";
import { dbPool } from "~/server/plugins/database";
import { createAccessToken } from "~/server/services/tokens";
import type { IStarostaUser } from "~/types/core";
import type{ LoginForm } from "~/types/forms";

export default defineEventHandler(async (event) => {
  try {
    const { groupId, password } = await readBody<LoginForm>(event);
    const [users] = (await dbPool.query(
      `SELECT starosti.id, firstName, secondName, thirdName, password, email, groups.name as groupName, groupId, isActivated
       FROM starosti INNER JOIN groups ON groups.id = starosti.groupId
       WHERE starosti.groupId = '${groupId}' LIMIT 1`
    )) as RowDataPacket[];
    if (users.length <= 0) {
      return createError({
        statusCode: 404,
        message: "Пользователь не найден",
      });
    }

    const user = users[0] as IStarostaUser;

    const hashedPassword = user.password;
    const checkPassword = bcrypt.compareSync(password, hashedPassword);

    if (!checkPassword) {
      return createError({
        statusCode: 400,
        message: "Неверный пароль",
      });
    }

    user.role = "starosta";
    const accessToken = createAccessToken(groupId, "starosta");

    setCookie(event, "token", accessToken, {
      maxAge: 24 * 60 * 60,
    });

    return user;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "server error",
    });
  }
});