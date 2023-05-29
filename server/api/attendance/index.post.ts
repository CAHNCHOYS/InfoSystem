import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { skippedHours, studentId, groupId } = await readBody(event);

    await dbPool.query(
      `INSERT INTO  student_attendance (studentId, skippedHours, groupId) VALUES (${studentId}, ${skippedHours}, ${groupId})`
    );

    return {
      isAdded: true,
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Ошибка на сервере!",
    });
  }
});
