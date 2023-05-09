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
    group: string()
      .required("Поле обязательное для ввода")
      .min(4, "Слишком короткое имя группы")
      .max(10, "Слишком длинное имя группы"),
  });

  return { registerSchema };
};
