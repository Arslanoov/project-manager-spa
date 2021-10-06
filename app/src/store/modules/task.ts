import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import StepInterface, { StepForm } from "@/types/schedule/task/StepInterface"

import TaskService from "@/services/api/v1/TaskService"
import StepService from "@/services/api/v1/StepService"

const taskService: TaskService = new TaskService()
const stepService: StepService = new StepService()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "task" : undefined
})

// TODO: Rewrite to async/await

class Task extends VuexModule {
  public currentTaskId: string | null = null
  public currentTaskSteps: Array<StepInterface> = []
  public isOpenedStepsDialog = false
  public isOpenedAddStepDialog = false

  public readonly clearStepForm: StepForm = {
    taskId: "",
    name: ""
  }
  public currentStepForm: StepForm = {
    ...this.clearStepForm
  }

  @Mutation
  public setCurrentTask(id: string): void {
    this.currentTaskId = id
    this.currentStepForm.taskId = id
  }

  @Mutation
  public setCurrentTaskSteps(list: Array<StepInterface>): void {
    this.currentTaskSteps = list
  }

  @Mutation
  public addCurrentTaskStep(step: StepInterface): void {
    this.currentTaskSteps.unshift(step)
  }

  @Mutation
  public clearCurrentTask(): void {
    this.currentTaskId = null
    this.currentTaskSteps = []
  }

  @Mutation
  public openStepsDialog(): void {
    this.isOpenedStepsDialog = true
  }

  @Mutation
  public closeStepsDialog(): void {
    this.isOpenedStepsDialog = false
  }

  @Mutation
  public removeCurrentTaskStep(id: number): void {
    const index: number = this.currentTaskSteps.findIndex(step => step.id === id)
    if (index !== -1) {
      this.currentTaskSteps.splice(index, 1)
    }
  }

  @Mutation
  public toggleAddStepDialog(): void {
    this.isOpenedAddStepDialog = !this.isOpenedAddStepDialog
  }

  @Mutation
  public changeCurrentTaskStepStatus(payload: {
    id: number,
    newStatus: string
  }): void {
    const index: number = this.currentTaskSteps.findIndex(item => item.id === payload.id)
    if (index !== -1) {
      this.currentTaskSteps[index].status = payload.newStatus
    }
  }

  @Mutation
  public changeCurrentTaskStepsStatus(payload: {
    ids: Array<number>,
    newStatus: string
  }): void {
    this.currentTaskSteps = this.currentTaskSteps
      .map(step => {
        if (payload.ids.includes(step.id)) {
          return {
            ...step,
            status: payload.newStatus
          }
        }

        return step
      })

  }

  @Mutation
  public setAddStepFormName(name: string): void {
    this.currentStepForm.name = name
  }

  @Mutation
  public clearCurrentStepForm(): void {
    this.currentStepForm = {
      ...this.currentStepForm,
      name: this.clearStepForm.name
    }
  }

  @Action
  public closeDialog(): void {
    this.context.commit("closeStepsDialog")
    this.context.commit("clearCurrentTask")
  }

  @Action({ rawError: true })
  public async fetchTaskSteps(id: string): Promise<Array<StepInterface>> {
    this.context.commit("setCurrentTask", id)

    try {
      const response = await taskService.getTaskSteps(this.currentTaskId as string)
      const steps: Array<StepInterface> = response.data.steps
      this.context.commit("setCurrentTaskSteps", steps)
      this.context.commit("openStepsDialog")
      return steps
    } catch (error) {
      console.log(error)
      if (error.response) {
        this.context.commit("setCurrentTaskSteps", error.response.data.error)
        this.context.commit("closeStepsDialog")
      }

      return error.response
    }
  }

  @Action({ rawError: true })
  public async removeStep(id: number): Promise<void> {
    try {
      await stepService.removeStep(id)
      this.context.commit("removeCurrentTaskStep", id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Action({ rawError: true })
  public async addStep(): Promise<StepInterface> {
    try {
      const response = await stepService.addStep(this.currentStepForm)
      const step: StepInterface = {
        ...this.currentStepForm,
        id: response.data.id,
        // eslint-disable-next-line @typescript-eslint/camelcase
        sort_order: response.data.id,
        status: "Not Complete"
      }

      this.context.commit("addCurrentTaskStep", step)
      this.context.commit("clearCurrentStepForm")

      return step
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Action({ rawError: true })
  public async changeStepStatus(payload: {
    id: number,
    newStatus: string
  }): Promise<StepInterface> {
    const step: StepInterface | undefined = this.currentTaskSteps.find(step => step.id === payload.id)
    if (step === undefined) {
      throw new Error("Step not found")
    }

    try {
      await stepService.changeStepStatus(payload.id, payload.newStatus)
      this.context.commit("changeCurrentTaskStepStatus", {
        id: payload.id,
        newStatus: payload.newStatus
      })
      return step
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Action
  public async changeStepsStatus(payload: {
    ids: Array<number>,
    newStatus: string
  }): Promise<void> {
    try {
      await stepService.changeStepsStatus(payload.ids, payload.newStatus)
      this.context.commit("changeCurrentTaskStepsStatus", {
        ids: payload.ids,
        newStatus: payload.newStatus
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public get currentTaskOrderedSteps(): Array<StepInterface> {
    return [...this.currentTaskSteps].sort(
      (a, b) => parseInt(a.sort_order) - parseInt(b.sort_order)
    )
  }

  public get selectedSteps(): Array<{id: number}> {
    return this.currentTaskSteps
      .filter(step => step.status === "Complete")
      .map(step => ({
        id: step.id
      }))
  }
}

export default Task
