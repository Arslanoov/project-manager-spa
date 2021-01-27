export interface StepForm {
  taskId: string,
  name: string
}

export interface StepRow {
  item: StepInterface,
  value: boolean
}

export interface StepRows {
  items: Array<StepInterface>,
  value: boolean
}

export default interface StepInterface {
  id: number,
  name: string,
  sort_order: string,
  status: string
}
