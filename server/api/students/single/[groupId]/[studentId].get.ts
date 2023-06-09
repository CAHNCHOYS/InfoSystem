import { RowDataPacket } from "mysql2";
import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { studentId, groupId } = event.context.params!;

    // console.log(groupId);
    // console.log(studentId);
    const [students] =
      (await dbPool.query(`SELECT firstName, lastName, middleName, DATE_FORMAT(dateOfBirth, "%d-%m-%Y") as dateOfBirth, phone, address 
    FROM group_students  WHERE group_students.id = ${studentId} AND groupId = ${groupId}`)) as RowDataPacket[];

    return students[0];
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "server error",
    });
  }
});
