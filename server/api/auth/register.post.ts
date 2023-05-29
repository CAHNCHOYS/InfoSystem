import { dbPool } from "~/server/plugins/database";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { sendEmail } from "~/server/services/nodemailer";

export default defineEventHandler(async (event) => {
  const { firstName, lastName, middleName, email, groupId, password } =
    await readBody(event);
  try {
    const [emails] = (await dbPool.query(
      `SELECT id FROM starosti WHERE email = '${email}' LIMIT 1`
    )) as RowDataPacket[];

    if (emails.length >= 1) {
      return createError({
        statusCode: 406,
        message: "Такой пользователь уже есть!",
      });
    }

    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(password, salt);


    await dbPool.query(`INSERT INTO group_students (firstName, lastName, middleName, groupId) 
    VALUES ('${firstName}', '${lastName}', '${middleName}',  ${groupId})`);

    await dbPool.query(
      `INSERT INTO starosti (firstName, lastName, middleName, email, password, groupId)
           VALUES ('${firstName}', '${lastName}', '${middleName}', '${email}', '${hashedPassword}', '${groupId}')`
    );

    //   await sendEmail(firstName, email);

    return {
      isRegistered: true,
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});
