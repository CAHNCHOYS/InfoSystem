import { dbPool } from "~/server/plugins/database";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);


  try {
    const [rows, fields] = await dbPool.query("SELECT * FROM starosti")!;
    console.log(rows);
    return {
      data: rows,
    };
  } catch (error) {
    console.log(error);
    return {
      data: "error",
    };
  }
});
