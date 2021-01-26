export interface StepForm {
  taskId: string,
  name: string
}

export interface StepRow {
  item: StepInterface,
  value: boolean
}

export default interface StepInterface {
  id: string,
  name: string,
  sort_order: string,
  status: string
}
