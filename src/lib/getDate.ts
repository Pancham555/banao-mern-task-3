export default (value: Date | string | undefined) => {
  if (value === undefined) {
    return "No date given!";
  }
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return day + "/" + month + "/" + year;
};
