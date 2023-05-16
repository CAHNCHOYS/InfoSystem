//dd-mm-yyyy -> yyyy-mm-dd
export function formatDate(date: string) {
  const splittedDate = date.split("-");

  const resultDate = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0];
  return resultDate;
}
