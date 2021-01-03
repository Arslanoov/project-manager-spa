import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import Schedule from "@/store/modules/schedule"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"

const Vue = createLocalVue()
Vue.use(Vuex)

const factory = () => {
  const store = new Vuex.Store({
    modules: {
      schedule: Schedule
    }
  })

  return getModule(Schedule, store)
}

const scheduleStore = factory()

describe("Schedule Store", () => {
  it("sets today schedule", () => {
    const todaySchedule: ScheduleInterface = {
      id: "4325",
      date: {
        day: 23,
        month: 12,
        year: 2012,
        string: "23.12.2020"
      },
      tasksCount: 1,
      tasks: [
        {
          id: "43267",
          name: "task 1",
          description: "desc",
          importantLevel: "Not Important",
          status: "Complete",
          stepsCount: 2,
          finishedSteps: 1
        }
      ]
    }

    scheduleStore.setTodaySchedule(todaySchedule)

    expect(scheduleStore.schedules[0]).toEqual(todaySchedule)
    expect(scheduleStore.schedules.length).toEqual(1)
  })

  it("sets adds new schedule", () => {
    const schedule: ScheduleInterface = {
      id: "4325",
      date: {
        day: 12,
        month: 12,
        year: 2015,
        string: "23.12.2020"
      },
      tasksCount: 1,
      tasks: [
        {
          id: "7654",
          name: "task 2",
          description: "desc 1",
          importantLevel: "Very Important",
          status: "Not Complete",
          stepsCount: 3,
          finishedSteps: 2
        }
      ]
    }

    scheduleStore.addSchedule(schedule)

    expect(scheduleStore.schedules[1]).toEqual(schedule)
    expect(scheduleStore.schedules.length).toEqual(2)
  })
})