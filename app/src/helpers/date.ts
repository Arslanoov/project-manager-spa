import ProjectInterface from "@/types/project/project"
import { DateSimpleType } from "@/types/common/date"

export const isYesterday = (day: number, month: number, year: number): boolean => {
  const todayDateObject = new Date()
  todayDateObject.setDate(todayDateObject.getDate() - 1)
  const dateObject = new Date(year, month, day)
  return todayDateObject.setHours(0, 0, 0, 0) === dateObject.setHours(0, 0, 0, 0)
}

export const isToday = (day: number, month: number, year: number): boolean => {
  const todayDateObject = new Date()
  const dateObject = new Date(year, month, day)
  return todayDateObject.setHours(0, 0, 0, 0) === dateObject.setHours(0, 0, 0, 0)
}

export const isTomorrow = (day: number, month: number, year: number): boolean => {
  const todayDateObject = new Date()
  todayDateObject.setDate(todayDateObject.getDate() + 1)
  const dateObject = new Date(year, month, day)
  return todayDateObject.setHours(0, 0, 0, 0) === dateObject.setHours(0, 0, 0, 0)
}

export const getScheduleDateString = (
  schedule: ProjectInterface,
  signs: {
    today: string,
    tomorrow: string,
    yesterday: string
  } = {
    today: "Today",
    tomorrow: "Tomorrow",
    yesterday: "Yesterday"
  }
): string => {
  if (isToday(schedule.date.day, schedule.date.month, schedule.date.year)) return signs.today
  if (isTomorrow(schedule.date.day, schedule.date.month, schedule.date.year)) return signs.tomorrow
  if (isYesterday(schedule.date.day, schedule.date.month, schedule.date.year)) return signs.yesterday
  return schedule.date.string
}

export const todaySimpleDate = (today = new Date()): DateSimpleType => ({
  day: today.getDate(),
  month: today.getMonth() + 1,
  year: today.getFullYear()
})
