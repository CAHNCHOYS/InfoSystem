import  type { ResultSetHeader } from "mysql2";
import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      phone,
      dateOfBirth,
      address,
      groupId,
    } = await readBody(event);

    const [results] =
      await dbPool.query(`INSERT INTO group_students (firstName, lastName, middleName, phone, dateOfBirth, address, groupId) 
    VALUES ('${firstName}', '${lastName}', '${middleName}', '${phone}', '${dateOfBirth}', '${address}', ${groupId})`);



    return {
      id: (results as ResultSetHeader).insertId,
    };


  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка на сервере",
    });
  }
});
