import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import ScheduleInterface, { CustomScheduleFormInterface } from "@/types/schedule/ScheduleInterface"

import ScheduleService from "@/services/api/v1/ScheduleService"
const service = new ScheduleService()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "nav" : undefined
})

class Nav extends VuexModule {
  public isShowNav = false
  public isOpenAddCustomScheduleForm = false
  public customSchedules: Array<ScheduleInterface> = []
  public language = "ru"
  public addCustomScheduleForm: CustomScheduleFormInterface = {
    name: ""
  }

  @Mutation
  public setLanguage(name: string): void {
    this.language = name
  }

  @Mutation
  public toggleNavVisibility(): void {
    this.isShowNav = !this.isShowNav
  }

  @Mutation
  public toggleAddCustomScheduleForm(): void {
    this.isOpenAddCustomScheduleForm = !this.isOpenAddCustomScheduleForm
  }

  @Mutation
  public setCustomSchedules(list: Array<ScheduleInterface>): void {
    this.customSchedules = list
  }

  @Mutation
  public setCustomScheduleFormName(name: string): void {
    this.addCustomScheduleForm.name = name
  }

  @Mutation
  public addCustomSchedule(schedule: ScheduleInterface): void {
    this.customSchedules.push(schedule)
  }

  @Mutation
  public deleteCustomSchedule(id: string): void {
    const index = this.customSchedules.findIndex(item => item.id === id)
    if (index !== -1) {
      this.customSchedules.splice(index, 1)
    }
  }

  @Action({ rawError: true })
  public changeLanguage(name: string): void {
    localStorage.setItem("language", name)
    this.context.commit("setLanguage", name)
  }

  @Action({ rawError: true })
  public getCustomSchedules(): Promise<Array<ScheduleInterface>> {
    return new Promise((resolve, reject) => {
      service.getCustomSchedules()
        .then(response => {
          const schedules: Array<ScheduleInterface> = response.data.schedules
          this.context.commit("setCustomSchedules", schedules)
          resolve(schedules)
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }

  @Action({ rawError: true })
  public createCustomSchedule(): Promise<ScheduleInterface> {
    return new Promise((resolve, reject) => {
      service.addCustomSchedules(this.addCustomScheduleForm.name)
        .then(response => {
          const schedule: ScheduleInterface = response.data
          this.context.commit("addCustomSchedule", schedule)
          resolve(schedule)
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }

  @Action({ rawError: true })
  public removeCustomSchedule(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      service.removeCustomSchedule(id)
        .then(() => {
          this.context.commit("deleteCustomSchedule", id)
          resolve()
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }
}

export default Nav
