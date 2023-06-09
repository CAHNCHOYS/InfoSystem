import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { groupId, date, examType, teacherName, className, time } = await readBody(
      event
    );

    await dbPool.query(`INSERT INTO group_exams (groupId, date, examType, teacherName, className, time) 
                        VALUES (${groupId}, '${date}', '${examType}', '${teacherName}', '${className}' , '${time}');
    `);

    return {
      isAdded: true,
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Ошибка на сервере",
    });
  }
});
