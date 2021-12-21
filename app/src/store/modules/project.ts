import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import ProjectService from "@/services/api/v1/ProjectService"

import { CreateProjectForm, emptyCreateForm } from "@/types/project/createProject"
import ProjectInterface from "@/types/project/project"

const service: ProjectService = new ProjectService()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "project" : undefined
})

export default class Project extends VuexModule {
  public createForm: CreateProjectForm = emptyCreateForm
  public projectList: ProjectInterface[] = []
  public currentProject: ProjectInterface | null = null

  @Mutation
  public changeCreateFormName(newName: string): void {
    this.createForm.name = newName
  }

  @Mutation
  public setProjectList(list: ProjectInterface[]): void {
    this.projectList = list
  }

  @Mutation
  public clearProjectList(): void {
    this.projectList = []
  }

  @Mutation
  public setCurrentProject(project: ProjectInterface): void {
    this.currentProject = project
  }

  @Mutation
  public clearCurrentProject(): void {
    this.currentProject = null
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

  @Action({ rawError: true })
  public async fetchPersonalProject(): Promise<void> {
    try {
      const response = await service.getPersonalProject()
      this.context.commit('setCurrentProject')
    } catch (e) {
      console.log(e)
    }
  }

  @Action({ rawError: true })
  public async fetchDailyProject(): Promise<void> {
    try {
      this.context.commit('setCurrentProject')
    } catch (e) {
      console.log(e)
    }
  }
}