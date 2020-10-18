const toString = (date) => {
  if (typeof date !== "object") return;

  return date.toJSON().split("T")[0];
}

export { toString };
