type PersonName = {
  firstName: string;
  secondName: string;
  thirdName: string;
};

export type LoginForm = {
  groupId: number;
  password: string;
};

export type RegisterForm = LoginForm &
  PersonName & {
    email: string;
  };

export type StudentForm = PersonName & {
  address: string;
  phone: string;
  dateOfBirth: string;
};
