import type { IStarostaUser, IStudentUser, IStudentGroup } from "./core";

export type RegisterResponse = {};

export type GetUserResponse = {
  user: IStarostaUser | IStudentUser;
}