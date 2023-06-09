import { object, string, number, date } from "yup";

export const useFormSchemas = () => {
  const checkNameSchema = object({
    firstName: string()
      .required("Поле обязательное для ввода!")
      .min(2, "Слишком короткое имя")
      .max(25, "Слишком длинное имя"),
    lastName: string()
      .required("Поле обязательное для ввода!")
      .min(2, "Слишком короткая фамилия")
      .max(25, "Слишком длинная фамилия"),
    middleName: string()
      .required("Поле обязательное для ввода!")
      .min(5, "Слишком короткое  Отчество!")
      .max(25, "Слишком длинное отчество"),
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

  const starostaLoginSchema = object({
    groupId: number()
      .required("Поле обязательное для ввода!")
      .typeError("Введите группу!"),
    password: string()
      .required("Поле обязательное для ввода")
      .min(4, "Слишком короткий пароль")
      .max(40, "Слишком много символов"),
  });

  const studentLoginSchema = checkNameSchema.shape({
    groupId: number()
      .required("Поле обязательное для ввода!")
      .typeError("Введите группу!"),
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
  });

  const updateStarostaInfoSchema = checkNameSchema.shape({
    email: string()
      .required("Поле обязательное для ввода")
      .min(4, "Слишком короткий email")
      .email("Введите правильный email")
      .max(50, "Слишком длинный email"),
  });

  const sessionSchema = object({
    className: string()
      .required("Поле обязательное для ввода")
      .min(3, "Введите парвильное название предмета")
      .max(25, "Слишком длинное название предмета"),
    teacherName: string()
      .required("Поле обязательное для ввода")
      .min(3, "Введите имя преподователя")
      .max(30, "Слишком длинное имя"),
    time: string()
      .required("Поле обязательное для ввода")
      .max(12, "Слишком много символов"),
    date: date()
      .typeError("Введите дату")
      .required("Поле обязательное для ввода")
      .min("2023-01-01", "Выберете дату позднее!")
      .max("2030-01-01", "Выберете дату пораньше!"),
    examType: string().required("Выберете тип"),
  });

  return {
    registerSchema,
    starostaLoginSchema,
    studentSchema,
    updateStarostaInfoSchema,
    studentLoginSchema,
    sessionSchema,
  };
};
