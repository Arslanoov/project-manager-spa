export interface CreateStepForm {
  taskId: string,
  name: string
}

export const createEmptyStepForm = (): CreateStepForm => ({
  taskId: "",
  name: ""
})