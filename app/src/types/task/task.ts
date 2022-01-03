export enum ImportantLevel {
  NotImportant = "Not Important",
  Important = "Important",
  VeryImportant = "Very Important"
}

export default interface TaskInterface {
  id: string,
  name: string,
  description: string,
  importantLevel: ImportantLevel,
  status: string,
  stepsCount: number,
  finishedSteps: number
}