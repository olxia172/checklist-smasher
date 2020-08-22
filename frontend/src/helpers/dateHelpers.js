const toString = (date) => {
  if (typeof date !== "object") return "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return [year, month, day].join("-");
}

export { toString };
