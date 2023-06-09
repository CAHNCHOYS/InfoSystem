import { RowDataPacket } from "mysql2";
import { dbPool } from "~/server/plugins/database";
import { createAccessToken } from "~/server/services/tokens";
import type { IStudentUser } from "~/types/core";

export default defineEventHandler(async (event) => {
  try {
    const { groupId, firstName, lastName, middleName } = await readBody(event);

    const [starosti] = (await dbPool.query(
      `SELECT id from starosti WHERE firstName = '${firstName}' AND lastName = '${lastName}' AND middleName = '${middleName}' AND groupId = ${groupId}`
    )) as RowDataPacket[];

    if (starosti.length) {
      return createError({
        statusCode: 400,
        message: "Студент с такими данными является старостой",
      });
    }

    const [students] =
      (await dbPool.query(`SELECT group_students.id, firstName, lastName, middleName, CONCAT(lastName, " ", firstName, " ", middleName) AS fullName,
       university_groups.name as groupName, university_groups.id as groupId 
       FROM university_groups INNER JOIN group_students ON group_students.groupId = university_groups.id 
       WHERE firstName = '${firstName}' AND lastName = '${lastName}' AND middleName = '${middleName}' AND groupId = ${groupId}
    `)) as RowDataPacket[];

    if (!students.length) {
      return createError({
        statusCode: 404,
        message: "Студент не найден",
      });
    }
    const student = students[0] as IStudentUser;
    student.role = "студент";
    const token = createAccessToken(groupId, "студент", student.id);
    setCookie(event, "token", token, {
      maxAge: 24 * 60 * 60,
    });

    return student;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Server error",
    });
  }
});
