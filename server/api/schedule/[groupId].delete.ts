import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { groupId } = event.context.params!;
    await dbPool.query(`DELETE from group_schedule WHERE groupId = ${groupId}`);

    return {
      isDeleted: true,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка при удалении",
    });
  }
});
