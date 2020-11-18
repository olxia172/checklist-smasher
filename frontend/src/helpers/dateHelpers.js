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

const nextDate = (currentDate) => {
  const nextDate = new Date(currentDate)
  nextDate.setDate(nextDate.getDate() + 1)

  return toString(nextDate)
}

const prevDate = (currentDate) => {
  const prevDate = new Date(currentDate)
  prevDate.setDate(prevDate.getDate() - 1)

  return toString(prevDate)
}
export { tomorrowDate, toString, nextDate, prevDate };
