import { ImportantLevel } from "@/types/task/task"

export interface CreateTaskForm {
  projectId: string,
  name: string | undefined,
  description: string | undefined,
  importantLevel: ImportantLevel
}

export const emptyCreateTaskForm = (): CreateTaskForm => ({
  projectId: "",
  name: "",
  description: "",
  importantLevel: ImportantLevel.Important
})