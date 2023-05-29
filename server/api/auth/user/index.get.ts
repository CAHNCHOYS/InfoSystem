import { dbPool } from "~/server/plugins/database";
import { verifyAccessToken } from "~/server/services/tokens";
import type { JwtPayload } from "jsonwebtoken";
import type { RowDataPacket } from "mysql2";
import type { IStarostaUser, IStudentUser } from "~/types/core";

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "token")!;

    if (!token) throw new Error();

    const authUser = verifyAccessToken(token) as JwtPayload;

    if (authUser.role === "староста") {
      const [users] = (await dbPool.query(
        `SELECT starosti.id, firstName, lastName, middleName, CONCAT(firstName, " ", lastName, " ", middleName) AS fullName,
         password, email, university_groups.name as groupName, groupId,  isActivated
         FROM starosti INNER JOIN university_groups ON university_groups.id = starosti.groupId
             WHERE starosti.groupId = '${authUser.groupId}' LIMIT 1`
      )) as RowDataPacket[];
      const starosta = users[0] as IStarostaUser;
      starosta.role = "староста";

      return starosta;
    } else {
      const [students] =
        (await dbPool.query(`SELECT group_students.id, firstName, lastName, middleName, CONCAT(firstName, " ", lastName, " ", middleName) AS fullName,
       university_groups.name as groupName, university_groups.id as groupId 
       FROM university_groups INNER JOIN group_students ON group_students.groupId = university_groups.id 
       WHERE group_students.id = ${authUser.studentId}
    `)) as RowDataPacket[];

      if (!students.length) {
        return createError({
          statusCode: 400,
          message: "Студента не существует",
        });
      }

      const student = students[0] as IStudentUser;
      student.role = "студент";

      return student;
    }
  } catch (error) {
    console.log(error, "err");
    return createError({
      statusCode: 400,
      message: "invalidToken",
    });
  }
});
