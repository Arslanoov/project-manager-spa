import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import StepInterface from "@/types/schedule/task/StepInterface"

import TaskService from "@/services/api/v1/taskService"

const service: TaskService = new TaskService()

@Module({
  namespaced: true
})

class Task extends VuexModule {
  public currentTaskId: string | null = null
  public currentTaskSteps: Array<StepInterface> = []
  public isOpenedStepsDialog = false

  taskError: string | null = null
  stepsError: string | null = null

  @Mutation
  public setCurrentTask(id: string): void {
    this.currentTaskId = id
  }

  @Mutation
  setCurrentTaskSteps(list: Array<StepInterface>): void {
    this.currentTaskSteps = list
  }

  @Mutation
  clearCurrentTask(): void {
    this.currentTaskId = null
    this.currentTaskSteps = []
  }

  @Mutation
  setTaskError(error: string): void {
    this.taskError = error
  }

  @Mutation
  setStepsError(error: string): void {
    this.stepsError = error
  }

  @Mutation
  clearTaskError(): void {
    this.taskError = null
  }

  @Mutation
  clearStepsError(): void {
    this.stepsError = null
  }

  @Mutation
  openStepsDialog(): void {
    this.isOpenedStepsDialog = true
  }

  @Mutation
  closeStepsDialog(): void {
    this.isOpenedStepsDialog = false
  }

  @Action
  closeDialog(): void {
    this.context.commit("closeStepsDialog")
    this.context.commit("clearCurrentTask")
  }

  @Action({ rawError: true })
  public fetchTaskSteps(id: string): Promise<Array<StepInterface>> {
    return new Promise((resolve, reject) => {
      this.context.commit("setCurrentTask", id)

      service.getTaskSteps(this.currentTaskId as string)
        .then(response => {
          const steps: Array<StepInterface> = response.data.steps
          this.context.commit("setCurrentTaskSteps", steps)
          this.context.commit("openStepsDialog")
          resolve(steps)
        })
        .catch(error => {
          console.log(error)
          if (error.response) {
            this.context.commit("setCurrentTaskSteps", error.response.data.error)
            this.context.commit("closeStepsDialog")
          }
          reject(error.response)
        })
    })
  }

  get currentTaskOrderedSteps(): Array<StepInterface> {
    console.log(this.currentTaskSteps)
    return this.currentTaskSteps.sort(
      (a, b) => parseInt(a.sort_order) - parseInt(b.sort_order)
    )
  }
}

export default Task