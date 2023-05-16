import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const {
      studentId,
      firstName,
      secondName,
      thirdName,
      dateOfBirth,
      address,
      phone,
    } = await readBody(event);

    console.log(studentId);

     await dbPool.query(
      `UPDATE group_students SET firstName = '${firstName}', secondName = '${secondName}', thirdName = '${thirdName}',
       dateOfBirth = '${dateOfBirth}', address = '${address}', phone = '${phone}'
       WHERE group_students.id = ${studentId}`
    );

    return {
      isUpdated: true,
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "my error",
    });
  }
});
