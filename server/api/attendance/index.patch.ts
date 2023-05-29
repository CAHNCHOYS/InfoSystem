import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { skippedHours, studentId } = await readBody(event);

    await dbPool.query(
      `UPDATE student_attendance SET skippedHours = ${skippedHours} WHERE studentId = ${studentId}`
    );

    
    return {
      isUpdated: true,
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Ошибка на сервере!",
    });
  }
});
