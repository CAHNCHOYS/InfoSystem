import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { createActivationToken } from "./tokens";

const config = useRuntimeConfig();

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  auth: {
    user: "infosystem2023@mail.ru",
    pass: "PZkyA8QgdNmUNs68S2qs",
  },
});

export const sendEmail = (userName: string, email: string) => {
  const verifyAccToken = createActivationToken(email);

  console.log(config);
  const options: Mail.Options = {
    from: "infosystem2023@mail.ru",
    to: email,
    subject: "Подтверждение почты",
    html: `
    <p>${userName}, для подтверждения почты  на сайте информационно справочной системы "Старосты и подгруппы" перейдите по ссылке: 
          <a href="${config.APP_LINK}/auth/verify/${verifyAccToken}"> ${config.APP_LINK}/auth/verify/${verifyAccToken}</a> 
    </p>`,
  };

  transporter.sendMail(options, (err, info) => {
    if (!err) {
      console.log(info);
    } else {
      console.log(err);
    }
  });
};
