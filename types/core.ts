export type UserRole = "староста" | "студент";
export type WeekDays =
  | "Понедельник"
  | "Вторник"
  | "Среда"
  | "Четверг"
  | "Пятница";
export type WeekType = "Верхняя" | "Нижняя" | "Обе";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  groupName: string;
  groupId: number;
}

export interface IStarostaUser extends IUser {
  //роль староста
  password: string;
  email: string;
  isActivated: 0 | 1;
  role: "староста";
}

export interface IStudentUser extends IUser {
  //роль студента
  role: "студент";
}

export interface IStudent {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
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

export interface IStudentAttendance {
  id: number;
  studentId: number;
  skippedHours: number;
}

export interface IGroupExam {
  id: number;
  className: string;
  teacherName: string;
  examType: "Консультация" | "Экзамен";
  date: string;
  time: string;
}
