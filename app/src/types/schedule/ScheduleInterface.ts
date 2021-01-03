import TaskInterface from "@/types/schedule/task/TaskInterface"

interface DateInterface {
  day: number,
  month: number,
  year: number,
  string: string
}

export default interface ScheduleInterface {
  id: string,
  date: DateInterface,
  tasksCount: number,
  tasks: Array<TaskInterface>
}