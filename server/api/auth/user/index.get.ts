import { dbPool } from "~/server/plugins/database";
import { verifyAccessToken } from "~/server/services/tokens";
import type { RowDataPacket } from "mysql2";
import type { IStarostaUser } from "~/types/core";
import { JwtPayload } from "jsonwebtoken";


export default defineEventHandler(async (event) => {
  try {
    console.log("verifiin token from backend");

    const token = getCookie(event, "token")!;

    if (!token) throw new Error();

    const authUser = verifyAccessToken(token) as JwtPayload;

    console.log(authUser, "user");
    if (authUser.role === "starosta") {
      const [users] = (await dbPool.query(
        `SELECT starosti.id, firstName, secondName, thirdName, password, email, groups.name as groupName, groupId,  isActivated
             FROM starosti INNER JOIN groups ON groups.id = starosti.groupId
             WHERE starosti.groupId = '${authUser.groupId}' LIMIT 1`
      )) as RowDataPacket[];
      const user = users[0] as IStarostaUser;
      user.role = "starosta";
      console.log(user);
      return user;
    } else {
      return {
        age: "20",
      };
    }
  } catch (error) {
    return createError({
      statusCode: 400,
      message: "invalidToken",
    });
  }
});
