import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import ScheduleService from "@/services/api/v1/ScheduleService"

const service: ScheduleService = new ScheduleService()

@Module({
  namespaced: true,
  name: "schedule"
})

class Schedule extends VuexModule {
  public schedules: Array<ScheduleInterface> = []

  @Mutation
  public setTodaySchedule(schedule: ScheduleInterface): void {
    this.schedules = [schedule]
  }

  @Mutation
  public addSchedule(schedule: ScheduleInterface): void {
    this.schedules.push(schedule)
  }

  @Action
  public getTodaySchedule(): Promise<ScheduleInterface> {
    return new Promise((resolve, reject) => {
      service.getTodaySchedule()
        .then(response => {
          const schedule: ScheduleInterface = response.data
          this.context.commit("setTodaySchedule", schedule)
          resolve(schedule)
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }

  @Action
  public getNextSchedule(): Promise<ScheduleInterface> {
    return new Promise((resolve, reject) => {
      if (this.schedules.length === 0) {
        reject(new Error("Empty schedules list"))
      }

      const latestSchedule: ScheduleInterface = this.schedules[this.schedules.length - 1]

      service.getNextSchedule(latestSchedule.id)
        .then(response => {
          const schedule: ScheduleInterface = response.data
          this.context.commit("addSchedule", schedule)
          resolve(schedule)
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }
}

export default Schedule