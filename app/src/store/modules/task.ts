import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import { CreateTaskForm, emptyCreateTaskForm } from "@/types/task/createTask"
import TaskInterface, { ImportantLevel } from "@/types/task/task"

import ProjectService from "@/services/api/v1/ProjectService"
import TaskService from "@/services/api/v1/TaskService"
import ProjectInterface from "@/types/project/project"

const projectService = new ProjectService()
const taskService = new TaskService()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "task" : undefined
})

class Task extends VuexModule {
  public currentProject: ProjectInterface | null = null
  public createForm: CreateTaskForm = emptyCreateTaskForm()

  @Mutation
  public changeProject(project: ProjectInterface): void {
    this.currentProject = project
  }

  @Mutation
  public clearCurrentProject(): void {
    this.currentProject = null
  }

  @Mutation
  public changeCreateFormName(newName: string) {
    this.createForm.name = newName
  }

  @Mutation
  public changeCreateFormLevel(newLevel: ImportantLevel) {
    this.createForm.importantLevel = newLevel
  }

  @Mutation
  public changeCreateFormDescription(description: string) {
    this.createForm.description = description
  }

  @Action({ rawError: true })
  public async fetchProject({ projectId, isPersonal }: {
    projectId: string,
    isPersonal: boolean
  }): Promise<void> {
    try {
      const { data } =
        await (isPersonal ? projectService.getPersonalProject() : projectService.getCustomProject(projectId))
      this.context.commit('changeProject', data)
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async fetchDailyProject(): Promise<void> {
    try {
      // TODO: Add request
      this.context.commit('setCurrentProject')
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async createTask(): Promise<TaskInterface | null> {
    try {
      const response = await taskService.addTask({
        projectId: this.currentProject?.id ?? "",
        name: this.createForm.name,
        description: this.createForm.description,
        importantLevel: this.createForm.importantLevel
      })

      return response.data
    } catch (e) {
      console.log(e)
      return null
    }
  }
}

export default Task
