import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { groupId } = event.context.params!;
    console.log(groupId);

    const [attendance] = await dbPool.query(
      `SELECT id, skippedHours, studentId FROM student_attendance WHERE groupId = ${groupId}`
    );

    return attendance;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка на сервере",
    });
  }
});
