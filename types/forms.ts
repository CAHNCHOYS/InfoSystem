type NameForm = {
  firstName: string; //имя
  lastName: string; //фамилия
  middleName: string; //отчество
};

export type StarostaLoginForm = {
  groupId: number;
  password: string;
};

export type StudentLoginForm = NameForm & {
  groupId: number;
}

export type StarostaRegisterForm = StarostaLoginForm &
  NameForm & {
    email: string;
  };

export type StudentForm = NameForm & {
  address: string;
  phone: string;
  dateOfBirth: string;
};

export type SessionExamForm = {
  className: string;
  type: string;
  time: string;
  date: string;

}
