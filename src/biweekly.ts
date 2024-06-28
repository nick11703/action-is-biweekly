// All dates/times are UTC
export const isBiweekly = (date: string | number ): boolean => {
  // Get today's day
  const now = new Date()
  // get the comparison date
  const compare = new Date(date)
  // Get the current and comparison day of the week
  const today = now.getUTCDay()
  const compareDay = compare.getUTCDay()
  // Check if same day of the week, fail early, fail fast
  const isSameDayOfWeek = today == compareDay
  // Get number of weeks since epoch
  const compareWeeksFromEpoch = Math.floor(compare.getTime() / 1000 / 60 / 60 / 24 / 7)
  const currentWeeksFromEpoch = Math.floor(now.getTime() / 1000 / 60 / 60 / 24 / 7)
  // get diff in weeks
  const weeksDiff = Math.abs(currentWeeksFromEpoch - compareWeeksFromEpoch)
  // mod 2, return true on 0, otherwise false
  const isTwoWeekIncrement = weeksDiff % 2 == 0

  return isSameDayOfWeek && isTwoWeekIncrement
}