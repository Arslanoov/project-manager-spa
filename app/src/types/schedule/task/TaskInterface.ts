export default interface Task {
  id: string,
  name: string,
  description: string,
  importantLevel: string,
  status: string,
  stepsCount: number,
  finishedSteps: number
}