import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { studentId } = event.context.params!;
    console.log(studentId);

    await dbPool.query(
      `DELETE FROM group_students WHERE group_students.id = ${studentId}`
    );

    return {
        isDeleted: true,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка на сервере",
    });
  }

});
