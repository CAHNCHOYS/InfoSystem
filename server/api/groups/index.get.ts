import { dbPool } from "~/server/plugins/database";
import type { RowDataPacket } from "mysql2";

export default defineEventHandler(async (event) => {
  try {

  
    const [groups] = (await dbPool.query(
      "SELECT * FROM university_groups"
    )) as RowDataPacket[];
    return groups;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Ошибка при получении данных с БД",
    });
  }
}); 
