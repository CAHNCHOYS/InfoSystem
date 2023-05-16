import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { className, id, weekType, classOrder, day, groupId } =
      await readBody(event);

    console.log(className, classOrder, day, groupId, weekType, "update");
    if (weekType === "Обе") {
      const [rows] =  await dbPool.query(
        `DELETE FROM group_schedule WHERE classOrder = ${classOrder}  AND groupId=${groupId} AND day = '${day}' LIMIT 2`
      );
      console.log(rows);
      await dbPool.query(`INSERT INTO group_schedule (className, day, classOrder, weekType, groupId )
      VALUES ('${className}','${day}', '${classOrder}', '${weekType}', ${groupId})`);
    } else {
      await dbPool.query(
        `UPDATE group_schedule SET className = '${className}', weekType = '${weekType}' WHERE group_schedule.id = ${id}`
      );
    }

    return {
      isUpdated: true,
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Ошибка сервера!",
    });
  }
});
