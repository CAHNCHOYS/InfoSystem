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
    students.value.sort((student1, student2) =>
      student1.lastName > student2.lastName ? 1 : -1
    );
  }

  function updateStudent(newStudent: IStudent) {
    const studentToUpdate = students.value.findIndex(
      (student) => student.id === newStudent.id
    );

    students.value[studentToUpdate] = newStudent;
    students.value.sort((student1, student2) =>
      student1.lastName > student2.lastName ? 1 : -1
    );
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
