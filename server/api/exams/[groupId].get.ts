import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { groupId } = event.context.params!;

    const [exams] = await dbPool.query(
      `SELECT id, time,  DATE_FORMAT(date, "%d-%m-%Y") as date, examType, className, teacherName FROM group_exams
       WHERE groupId = ${groupId}   ORDER BY date ASC
      
      `
    );

    return exams;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Ошибка на сервере",
    });
  }
});
