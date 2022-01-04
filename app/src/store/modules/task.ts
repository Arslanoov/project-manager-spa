import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import { createEmptyTaskForm, CreateTaskForm } from "@/types/task/form"
import TaskInterface, { ImportantLevel } from "@/types/task/task"
import { createEmptyStepForm, CreateStepForm } from "@/types/step/form"

import ProjectService from "@/services/api/v1/ProjectService"
import TaskService from "@/services/api/v1/TaskService"
import StepService from "@/services/api/v1/StepService"

import StepInterface from "@/types/step/step"
import ProjectInterface from "@/types/project/project"

const projectService = new ProjectService()
const taskService = new TaskService()
const stepService = new StepService()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "task" : undefined
})

class Task extends VuexModule {
  public currentProject: ProjectInterface | null = null
  public createForm: CreateTaskForm = createEmptyTaskForm()

  public currentTask: string | null = null
  public currentTaskSteps: StepInterface[] = []
  public createStepForm: CreateStepForm = createEmptyStepForm()

  @Mutation
  public changeProject(project: ProjectInterface): void {
    this.currentProject = project
  }

  @Mutation
  public clearCurrentProject(): void {
    this.currentProject = null
  }

  @Mutation
  public changeCreateFormName(newName: string): void {
    this.createForm.name = newName
  }

  @Mutation
  public changeCreateFormLevel(newLevel: ImportantLevel): void {
    this.createForm.importantLevel = newLevel
  }

  @Mutation
  public changeCreateFormDescription(newDescription: string): void {
    this.createForm.description = newDescription
  }

  @Mutation
  public changeTask(taskId: string): void {
    this.currentTask = taskId
    this.createStepForm.taskId = taskId
  }

  @Mutation
  public clearTask(): void {
    this.currentTask = null
  }

  @Mutation
  public setCurrentTaskSteps(steps: StepInterface[]): void {
    this.currentTaskSteps = steps
  }

  @Mutation
  public addCurrentTaskStep(step: StepInterface): void {
    this.currentTaskSteps.unshift(step)
  }

  @Mutation
  public clearCreateStepForm(): void {
    this.createStepForm = createEmptyStepForm()
  }

  @Mutation
  public clearTaskSteps(): void {
    this.currentTaskSteps = []
  }

  @Mutation
  public changeCreateStepFormName(newName: string): void {
    this.createStepForm.name = newName
  }

  @Action({ rawError: true })
  public async fetchProject({ projectId, isPersonal }: {
    projectId: string,
    isPersonal: boolean
  }): Promise<void> {
    try {
      const { data } =
        await (isPersonal ? projectService.getPersonalProject() : projectService.getCustomProject(projectId))
      this.context.commit("changeProject", data)
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async fetchDailyProject(): Promise<void> {
    try {
      // TODO: Add request
      this.context.commit("setCurrentProject")
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async createTask(): Promise<TaskInterface | null> {
    try {
      const { data } = await taskService.addTask({
        projectId: this.currentProject?.id ?? "",
        name: this.createForm.name,
        description: this.createForm.description,
        importantLevel: this.createForm.importantLevel
      })

      return data
    } catch (e) {
      console.log(e)
      return null
    }
  }

  @Action({ rawError: true })
  public async fetchCurrentTaskSteps(): Promise<StepInterface[] | null> {
    try {
      if (!this.currentTask) {
        throw new Error("Task not defined.")
      }
      const { data: { steps } } = await taskService.getTaskSteps(this.currentTask)
      this.context.commit("setCurrentTaskSteps", steps)
      return steps
    } catch (e) {
      console.log(e)
      return null
    }
  }

  @Action({ rawError: true })
  public async createStep(): Promise<StepInterface | null> {
    try {
      const { data: step } = await stepService.addStep(this.createStepForm)
      this.context.commit("addCurrentTaskStep", step)
      this.context.commit("clearCreateStepForm")
      return step
    } catch (e) {
      console.log(e)
      return null
    }
  }
}

export default Task
