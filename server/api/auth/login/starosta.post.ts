import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";
import { dbPool } from "~/server/plugins/database";
import { createAccessToken } from "~/server/services/tokens";
import type { IStarostaUser } from "~/types/core";
import type { StarostaLoginForm } from "~/types/forms";

export default defineEventHandler(async (event) => {
  try {
    const { groupId, password } = await readBody<StarostaLoginForm>(event);
    const [users] = (await dbPool.query(
      `SELECT starosti.id, firstName, lastName, middleName, CONCAT(lastName, " ", firstName, " ", middleName) AS fullName, password, 
       email, university_groups.name as groupName, groupId, isActivated
       FROM starosti INNER JOIN university_groups ON university_groups.id = starosti.groupId
       WHERE starosti.groupId = '${groupId}'`
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

    user.role = "староста";
    const accessToken = createAccessToken(groupId, "староста");

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
