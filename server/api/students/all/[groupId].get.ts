import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  console.log(event.context.params);

  try {
    const { groupId } = event.context.params!;

    const [students] =
      await dbPool.query(`SELECT group_students.id, firstName, secondName, thirdName, DATE_FORMAT(dateOfBirth, "%d-%m-%Y") as dateOfBirth, phone, address 
    FROM group_students INNER JOIN groups on groups.id = group_students.groupId WHERE group_students.groupId = ${groupId}`);

    return students;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: (error as Error).message,
    });
  }

});
