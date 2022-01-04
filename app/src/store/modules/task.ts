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

  public currentTask: TaskInterface | null = null
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
  public changeStepStatus({ id, status }: { id: number, status: "Not Complete" | "Complete" }): void {
    if (!this.currentTask) return
    const idx: number = this.currentTask.steps.findIndex((step) => step.id === id) as number
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
  public async fetchCurrentTask(id: string): Promise<TaskInterface | null> {
    try {
      if (!this.currentTask) {
        throw new Error("Task not defined.")
      }
      const { data: task } = await taskService.getTaskSteps(id)
      this.context.commit("changeTask", task)
      return task
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

  @Action({ rawError: true })
  public async toggleStepStatus(id: number): Promise<void | null> {
    try {
      const step = (this.currentTask?.steps as StepInterface[]).find((step) => step.id === id)
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
      return null
    }
  }
}

export default Task
