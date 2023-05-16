import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const {
      firstName,
      secondName,
      thirdName,
      phone,
      dateOfBirth,
      address,
      groupId,
    } = await readBody(event);

    const [rows] =
      await dbPool.query(`INSERT INTO group_students (firstName, secondName, thirdName, phone, dateOfBirth, address, groupId) 
    VALUES ('${firstName}', '${secondName}', '${thirdName}', '${phone}', '${dateOfBirth}', '${address}', ${groupId})`);

    return {
      isAdded: true,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка на сервере",
    });
  }
});
