import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  console.log(event.context.params);

  try {
    const { groupId } = event.context.params!;

    const [students] =
      await dbPool.query(`SELECT group_students.id, firstName, lastName, middleName, CONCAT(lastName, " ",firstName , " ", middleName) AS fullName,
       DATE_FORMAT(dateOfBirth, "%d-%m-%Y") as dateOfBirth, phone, address 
       FROM group_students INNER JOIN university_groups on university_groups.id = group_students.groupId WHERE group_students.groupId = ${groupId} ORDER BY lastName`);

    return students;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});
