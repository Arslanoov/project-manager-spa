import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import Schedule from "@/store/modules/schedule"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import {TaskForm} from "@/types/schedule/task/TaskInterface";

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
    expect(scheduleStore.schedules.length).toEqual(0)

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

  it("adds new schedule", () => {
    expect(scheduleStore.schedules.length).toEqual(1)

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

  it("adds new task form", () => {
    expect(scheduleStore.taskForms.length).toEqual(0)

    const form: TaskForm = {
      scheduleId: "id",
      name: undefined,
      description: undefined,
      importantLevel: undefined
    }

    scheduleStore.addTaskForm(form)

    expect(scheduleStore.taskForms[0]).toEqual(form)
    expect(scheduleStore.taskForms.length).toEqual(1)
  })

  it("adds fills task form", () => {
    expect(scheduleStore.taskForms.length).toEqual(1)

    const form: TaskForm = {
      scheduleId: "id",
      name: "Some name",
      description: "Some desc",
      importantLevel: "Very Important"
    }

    scheduleStore.fillTaskForm(form)

    expect(scheduleStore.taskForms[0]).toEqual(form)
    expect(scheduleStore.taskForms.length).toEqual(1)
  })
})