import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { examId } = event.context.params!;

    await dbPool.query(`DELETE FROM group_exams WHERE id = ${examId}`);

    return {
      isDeleted: true,
    };
  } catch (error) {
    console.log(error, "error");
    throw createError({
      statusCode: 500,
      message: "Ошибка на сервере",
    });
  }
});
