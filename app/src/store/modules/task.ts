import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import { createEmptyTaskForm, CreateTaskForm } from "@/types/task/form"
import TaskInterface, { ImportantLevel } from "@/types/task/task"
import { createEmptyStepForm, CreateStepForm } from "@/types/step/form"

import ProjectService from "@/services/api/v1/ProjectService"
import TaskService from "@/services/api/v1/TaskService"
import StepService from "@/services/api/v1/StepService"

import { todaySimpleDate } from "@/helpers/date"

import StepInterface from "@/types/step/step"
import ProjectInterface from "@/types/project/project"
import { DateSimpleType } from "@/types/common/date"

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

  public currentTask: TaskInterface | null = null
  public createStepForm: CreateStepForm = createEmptyStepForm()

  public dailyProjectDate: DateSimpleType | null = todaySimpleDate()

  @Mutation
  public changeProject(project: ProjectInterface): void {
    this.currentProject = project
  }

  @Mutation
  public setDailyProjectDate(payload: DateSimpleType): void {
    this.dailyProjectDate = payload
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
  public changeTask(task: TaskInterface): void {
    this.currentTask = task
    this.createStepForm.taskId = task.id
  }

  @Mutation
  public clearTask(): void {
    this.currentTask = null
  }

  @Mutation
  public addCurrentTaskStep(step: StepInterface): void {
    (this.currentTask?.steps as StepInterface[]).push(step)
  }

  @Mutation
  public clearCreateStepForm(): void {
    this.createStepForm = createEmptyStepForm()
  }

  @Mutation
  public changeCreateStepFormName(newName: string): void {
    this.createStepForm.name = newName
  }

  @Mutation
  public changeTaskStatus({ id, status }: { id: string, status: "Not Complete" | "Complete" }): void {
    if (!this.currentProject) return
    const idx: number = this.currentProject.tasks.findIndex((tasks) => tasks.id === id)
    if (idx !== -1) {
      this.currentProject.tasks[idx].status = status
    }
  }

  @Mutation
  public changeStepStatus({ id, status }: { id: number, status: "Not Complete" | "Complete" }): void {
    if (!this.currentTask) return
    const idx: number = this.currentTask.steps.findIndex((step) => step.id === id)
    if (idx !== -1) {
      (this.currentTask.steps[idx] as StepInterface).status = status
    }
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
  public async fetchDailyProject(payload: DateSimpleType): Promise<void> {
    try {
      const { data } = await projectService.getProjectByDate(
        payload.day,
        payload.month,
        payload.year
      )
      this.context.commit("changeProject", data)
      this.context.commit("setDailyProjectDate", payload)
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async createTask(): Promise<void | TaskInterface> {
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
    }
  }

  @Action({ rawError: true })
  public async fetchCurrentTask(id: string): Promise<void | TaskInterface> {
    try {
      const { data: task } = await taskService.getTaskSteps(id)
      this.context.commit("changeTask", task)
      return task
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async createStep(): Promise<void | StepInterface> {
    try {
      const { data: step } = await stepService.addStep(this.createStepForm)
      this.context.commit("addCurrentTaskStep", step)
      this.context.commit("clearCreateStepForm")
      return step
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async toggleTaskStatus(id: string): Promise<void> {
    try {
      const task = (this.currentProject as ProjectInterface).tasks.find((task) => task.id === id)
      if (!task) {
        throw new Error("Task not found")
      }

      const toggledStatus = task.status === 'Complete' ? 'Not Complete' : 'Complete'
      await taskService.changeTaskStatus(id, toggledStatus)
      this.context.commit("changeTaskStatus", {
        id,
        status: toggledStatus
      })
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async toggleStepStatus(id: number): Promise<void> {
    try {
      const step = (this.currentTask as TaskInterface).steps.find((step) => step.id === id)
      if (!step) {
        throw new Error("Step not found")
      }

      const toggledStatus = step.status === 'Complete' ? 'Not Complete' : 'Complete'
      await stepService.changeStepStatus(id, toggledStatus)
      this.context.commit("changeStepStatus", {
        id,
        status: toggledStatus
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default Task
