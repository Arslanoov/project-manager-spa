export enum ImportantLevelColor {
  "Not Important" = "green lighten-1",
  "Important" = "yellow darken-2",
  "Very Important" = "red lighten-1"
}

export const importantLevelsList: Array<string> = ["Not Important", "Important", "Very Important"]

export interface TaskForm {
  scheduleId: string,
  name: string | undefined,
  description: string | undefined,
  importantLevel: string | undefined
}

export default interface TaskInterface {
  id: string,
  name: string,
  description: string,
  importantLevel: string,
  status: string,
  stepsCount: number,
  finishedSteps: number
}
