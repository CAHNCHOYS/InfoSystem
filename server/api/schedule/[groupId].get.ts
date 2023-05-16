import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { groupId } = event.context.params!;

    const [schedule] = await dbPool.query(
      `SELECT id, day, weekType, classOrder, className FROM group_schedule WHERE group_schedule.groupId = ${groupId}`
    );
    console.log(groupId);

    return schedule;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Ошибка сервера!",
    });
  }
});
