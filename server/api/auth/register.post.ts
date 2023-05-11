import { dbPool } from "~/server/plugins/database";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { sendEmail } from "~/server/helpers/nodemailer";

export default defineEventHandler(async (event) => {
  const { firstName, secondName, thirdName, email, group, password } =
    await readBody(event);


  try {
    const [rows] = await dbPool.query(
      `SELECT id FROM starosti WHERE email = '${email}'`
    );

    if ((rows as RowDataPacket[]).length >= 1) {
      return createError({
        statusCode: 406,
        message: "Такой пользователь уже есть!",
      });
    }

    const salt = bcrypt.genSaltSync(6);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log(hashedPassword, "password");

    const [] = await dbPool.query(
      `INSERT INTO starosti (first_name, second_name, third_name, email, password, group_name)
           VALUES ('${firstName}', '${secondName}', '${thirdName}', '${email}', '${hashedPassword}', '${group}')`
    );

    console.log("sending email");
     sendEmail(firstName, email);
     console.log("sending endend");

    return {
      isRegisterSuccess: true,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});
