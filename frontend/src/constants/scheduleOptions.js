const REPEAT_OPTIONS = [
  'daily',
  'weekly',
  'monthly',
  'yearly'
]

const DAILY_OPTS = [
  { label: "Mon", value: "monday" },
  { label: "Tue", value: "tuesday" },
  { label: "Wed", value: "wednesday" },
  { label: "Thu", value: "thursday" },
  { label: "Fri", value: "friday" },
  { label: "Sat", value: "saturday" },
  { label: "Sun", value: "sunday" },
]

const MONTHLY_OPTS = Array.from(Array(28), (_, i) => i + 1).map((el) => ({ label: el, value: el }))

const END_OPTS = [
  "never",
  "onDate",
  "count"
]

export {
  DAILY_OPTS,
  END_OPTS,
  MONTHLY_OPTS,
  REPEAT_OPTIONS,
}
