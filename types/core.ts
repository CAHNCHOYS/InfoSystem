export type UserRole = "starosta" | "student";
export type WeekDays = "Понедельник" | "Вторник" | "Среда" | "Четверг" | "Пятница";
export type WeekType = "Верхняя" | "Нижняя" | "Обе";

export interface IStarostaUser {
  id: number;
  password: string;
  email: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  groupName: string;
  groupId: number;
  isActivated: 0 | 1; //Активирован ли аккаунт
  role: "starosta";
}

export interface IStudentUser {
  fullName: string;
  groupName: string;
  groupId: number;
  role: "student";
}

export interface IStudent {
  id: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  dateOfBirth: string;
  phone: string;
  address: string;
}

export interface IStudentGroup {
  id: number;
  name: string;
}

export interface ISchedule {
  id: number;
  day: WeekDays;
  weekType: WeekType;
  classOrder: number;
  className: string; //Название пары
}
