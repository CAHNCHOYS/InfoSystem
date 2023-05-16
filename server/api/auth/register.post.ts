import { dbPool } from "~/server/plugins/database";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { sendEmail } from "~/server/services/nodemailer";

export default defineEventHandler(async (event) => {
  const { firstName, secondName, thirdName, email, groupId, password } =
    await readBody(event);

  console.log(groupId);
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

    console.log(hashedPassword, "password");

    const [] = await dbPool.query(
      `INSERT INTO starosti (firstName, secondName, thirdName, email, password, groupId)
           VALUES ('${firstName}', '${secondName}', '${thirdName}', '${email}', '${hashedPassword}', '${groupId}')`
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
