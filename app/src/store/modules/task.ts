import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import { CreateTaskForm, emptyCreateTaskForm } from "@/types/task/createTask"
import TaskInterface, { ImportantLevel } from "@/types/task/task"

import TaskService from "@/services/api/v1/TaskService"

const taskService = new TaskService()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "task" : undefined
})

class Task extends VuexModule {
  public currentProjectId: string | null = null
  public createForm: CreateTaskForm = emptyCreateTaskForm()

  @Mutation
  public changeProject(id: string) {
    this.currentProjectId = id
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
  public async createTask(): Promise<TaskInterface | null> {
    try {
      const response = await taskService.addTask({
        projectId: this.currentProjectId ?? "",
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
