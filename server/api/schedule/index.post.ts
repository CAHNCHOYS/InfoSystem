import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { className, day, order, weekType, groupId } = await readBody(event);


    console.log(groupId, className, day, order);
    await dbPool.query(`INSERT INTO group_schedule (className, day, classOrder, weekType, groupId )
     VALUES ('${className}','${day}', '${order}', '${weekType}', ${groupId})`);

    return {
      isAdded: true,
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Ошибка сервера!",
    });
  }
});
