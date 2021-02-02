import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"

import ScheduleService from "@/services/api/v1/ScheduleService"
const service = new ScheduleService()

@Module({
  namespaced: true
  // Add for tests name: "nav"
  // TODO: Fix
})

class Nav extends VuexModule {
  public isShowNav = false
  public customSchedules: Array<ScheduleInterface> = []

  @Mutation
  public toggleNavVisibility(): void {
    this.isShowNav = !this.isShowNav
  }

  @Mutation
  public setCustomSchedules(list: Array<ScheduleInterface>): void {
    this.customSchedules = list
  }

  @Mutation
  public addCustomSchedule(schedule: ScheduleInterface): void {
    this.customSchedules.push(schedule)
  }

  @Mutation
  public removeCustomSchedule(schedule: ScheduleInterface): void {
    const index = this.customSchedules.findIndex(item => item.id === schedule.id)
    if (index !== -1) {
      this.customSchedules.splice(index, 1)
    }
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
}

export default Nav
