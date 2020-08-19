const REPEAT_OPTIONS = [
  'daily',
  'weekly',
  'monthly',
  'yearly'
]

const DAILY_OPTS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
]

const MONTHLY_OPTS = Array.from(Array(28), (_, i) => i + 1)

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
