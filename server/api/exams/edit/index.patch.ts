import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { examId, date, examType, teacherName, className, time } =
      await readBody(event);

    await dbPool.query(`UPDATE group_exams SET date = '${date}', examType = '${examType}', teacherName = '${teacherName}',
                        className = '${className}', time = '${time}'  WHERE id = ${examId}`);

    return {
      isUpdated: true,
    };
  } catch (error) {
    console.log(error, "error");
    throw createError({
      statusCode: 500,
      message: "Ошибка на сервере",
    });
  }
});
