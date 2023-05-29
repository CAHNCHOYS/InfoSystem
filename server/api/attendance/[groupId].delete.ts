import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const { groupId } = event.context.params!;

    await dbPool.query(
      `DELETE FROM student_attendance WHERE groupId = ${groupId}`
    );

    return {
      isDeleted: true,
    };
  } catch (error) {
    console.log(error);
  }
});
