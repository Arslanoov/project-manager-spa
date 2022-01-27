import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import ProjectService from "@/services/api/v1/ProjectService"

import { CreateProjectForm, emptyCreateProjectForm } from "@/types/project/createProject"
import ProjectInterface from "@/types/project/project"

const service: ProjectService = new ProjectService()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "project" : undefined
})

export default class Project extends VuexModule {
  public createForm: CreateProjectForm = emptyCreateProjectForm()

  public projectList: ProjectInterface[] = []
  public currentProject: ProjectInterface | null = null

  @Mutation
  public changeCreateFormName(newName: string): void {
    this.createForm.name = newName
  }

  @Mutation
  public clearCreateForm(): void {
    this.createForm = emptyCreateProjectForm()
  }

  @Mutation
  public setProjectList(list: ProjectInterface[]): void {
    this.projectList = list
  }

  @Mutation
  public clearProjectList(): void {
    this.projectList = []
  }

  @Action({ rawError: true })
  public async fetchProjects(): Promise<void> {
    try {
      this.context.commit('clearProjectList')
      const response = await service.getCustomProjects()
      this.context.commit('setProjectList', response.data.schedules)
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async createProject(): Promise<void> {
    try {
      await service.addCustomProject(this.createForm.name)
    } catch (e) {
      console.log(e)
    }
  }
}