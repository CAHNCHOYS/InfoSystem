import { object, string, number, boolean, date } from "yup";

export const useFormSchemas = () => {
  const checkNameSchema = object({
    firstName: string()
      .required("Поле обязательное для ввода!")
      .min(2, "Слишком короткое имя")
      .max(40, "Слишком длинное имя"),
    secondName: string()
      .required("Поле обязательное для ввода!")
      .min(2, "Слишком короткая фамилия")
      .max(40, "Слишком длинная фамилия"),
    thirdName: string()
      .required("Поле обязательное для ввода!")
      .min(5, "Слишком короткое  Отчество!")
      .max(40, "Слишком длинное отчество"),
  });

  const registerSchema = checkNameSchema.shape({
    email: string()
      .required("Поле обязательное для ввода")
      .min(4, "Слишком короткий email")
      .email("Введите правильный email")
      .max(50, "Слишком длинный email"),
    password: string()
      .required("Поле обязательное для ввода")
      .min(4, "Слишком короткий пароль")

      .max(40, "Слишком длинный пароль")
      .test(
        "upper-name",
        "В пароле должна быть одна большая буква",
        (value) => {
          return value !== value.toLowerCase();
        }
      ),
    groupId: number()
      .required("Поле обязательное для ввода!")
      .typeError("Введите группу!"),
  });

  const loginSchema = object({
    groupId: number()
      .required("Поле обязательное для ввода!")
      .typeError("Введите группу!"),
    password: string()
      .required("Поле обязательное для ввода")
      .min(4, "Слишком короткий пароль")
      .max(40, "Слишком много символов"),
  });

  const studentSchema = checkNameSchema.shape({
    phone: string()
      .required("Поле обязательное для ввода")
      .min(4, "Слишком короткий номер телефона")
      .max(20, "Силшком длинный номер телефона"),
    address: string()
      .required("Поле обязательное для ввода")
      .min(6, "Слишком короткий адрес")
      .max(50, "Силшком длинный адрес"),
    dateOfBirth: date()
      .required("Поле обязательное для ввода")
      .min("1992-12-30", "Минимало доступная  дата для добавления: 30.12.1992")
      .max(
        "2010-12-30",
        "Максимально доступная  дата для добавления: 30.12.2010"
      )
      .typeError("Выберете дату!"),
    language: string().required("Выберете иностранный язык!").default("Английский"),
  });

  return { registerSchema, loginSchema, studentSchema };
};
