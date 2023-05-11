import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { createActivationToken } from "./tokens";

const config = useRuntimeConfig();

export const sendEmail = async (userName: string, email: string) => {
  const transporter = await nodemailer.createTransport({
    name: "smtp.mail.ru",
    host: "smtp.mail.ru",
    port: 465,
    secure: true,

    logger: true,

    auth: {
      user: "infosystem2023@mail.ru",
      pass: "PZkyA8QgdNmUNs68S2qs",
    },
  });
  const verifyAccToken = createActivationToken(email);

  const options: Mail.Options = {
    from: "infosystem2023@mail.ru",
    to: email,
    subject: "Подтверждение почты",
    html: `
    <p>${userName}, для подтверждения почты  на сайте информационно справочной системы "Старосты и подгруппы" перейдите по ссылке: 
          <a href="${config.APP_LINK}/auth/verify/${verifyAccToken}"> ${config.APP_LINK}/auth/verify/${verifyAccToken}</a> 
    </p>`,
  };

  await transporter.sendMail(options, (err, info) => {
    if (!err) {
      console.log(info);
    } else {
      console.log(err, "error");
    }
  });
};
