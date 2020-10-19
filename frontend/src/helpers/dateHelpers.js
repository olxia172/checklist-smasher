const toString = (date) => {
  if (typeof date !== "object") return;

  return date.toJSON().split("T")[0];
}

const tomorrowDate = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return toString(tomorrow)
}

export { tomorrowDate, toString };
