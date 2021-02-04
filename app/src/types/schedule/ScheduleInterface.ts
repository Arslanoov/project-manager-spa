import TaskInterface from "@/types/schedule/task/TaskInterface"

interface DateInterface {
  day: number,
  month: number,
  year: number,
  string: string
}

export interface CustomScheduleFormInterface {
  name: string
}

export default interface ScheduleInterface {
  id: string,
  name?: string,
  date: DateInterface,
  tasksCount: number,
  tasks: Array<TaskInterface>,
  isMain?: boolean,
  isCustom?: boolean
}
