import TaskInterface from "@/types/task/task"

interface DateInterface {
  day: number,
  month: number,
  year: number,
  string: string
}

export default interface ProjectInterface {
  id: string,
  name?: string,
  date: DateInterface,
  tasksCount: number,
  tasks?: Array<TaskInterface>,
  isMain?: boolean,
  isCustom?: boolean
}
