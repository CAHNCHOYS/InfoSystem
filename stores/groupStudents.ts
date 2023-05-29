import { IStudent } from "~/types/core";

export const useGroupStudentsStore = defineStore("groupStudents", () => {
  const students = ref<IStudent[]>([]);
  const studentsFetchError = ref<boolean>(false);

  async function getAllGroupStudents(groupId: number) {
    const { data, error } = await useFetch<IStudent[]>(
      "/api/students/all/" + groupId
    );
    if (data.value) {
      students.value = data.value;
    } else if (error.value) {
      studentsFetchError.value = true;
    }
  }

  function addStudent(student: IStudent) {
    students.value.push(student);
    console.log(students.value);
  }

  function updateStudent(newStudent: IStudent) {
    const studentToUpdate = students.value.findIndex(
      (student) => student.id === newStudent.id
    );

    students.value[studentToUpdate] = newStudent;
    console.log(students.value);
  }

  function deleteStudents(studentIds: number[]) {
    students.value = students.value.filter(
      (student) => !studentIds.includes(student.id)
    );
  }

  return {
    students,
    studentsFetchError,
    getAllGroupStudents,
    addStudent,
    updateStudent,
    deleteStudents,
  };
});
