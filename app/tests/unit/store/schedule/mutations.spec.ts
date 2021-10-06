import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import Schedule from "@/store/modules/schedule"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import TaskInterface, { TaskForm } from "@/types/schedule/task/TaskInterface"

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
const scheduleWithoutTasks: ScheduleInterface = {
  id: "4325",
  date: {
    day: 12,
    month: 12,
    year: 2015,
    string: "23.12.2020"
  },
  tasksCount: 0,
  tasks: []
}
const task: TaskInterface = {
  id: "someid",
  name: "task",
  description: "desc",
  importantLevel: "Important",
  status: "Not Finished",
  stepsCount: 0,
  finishedSteps: 0
}
const form: TaskForm = {
  scheduleId: "id",
  name: undefined,
  description: undefined,
  importantLevel: undefined
}

describe("Schedule Store", () => {
  it("adds new schedule", () => {
    scheduleStore.clearSchedulesAndForms()

    expect(scheduleStore.schedules.length).toEqual(0)

    scheduleStore.addSchedule(schedule)

    expect(scheduleStore.schedules[0]).toEqual(schedule)
    expect(scheduleStore.schedules.length).toEqual(1)

    scheduleStore.clearSchedulesAndForms()
  })

  it("adds and fills new task form", () => {
    scheduleStore.clearSchedulesAndForms()

    expect(scheduleStore.taskForms.length).toEqual(0)

    scheduleStore.addTaskForm(form)

    expect(scheduleStore.taskForms[0]).toEqual(form)
    expect(scheduleStore.taskForms.length).toEqual(1)

    scheduleStore.fillTaskForm(form)

    expect(scheduleStore.taskForms[0]).toEqual(form)
    expect(scheduleStore.taskForms.length).toEqual(1)

    scheduleStore.clearSchedulesAndForms()
  })

  it("toggles add task form dialog", () => {
    scheduleStore.clearSchedulesAndForms()
    expect(scheduleStore.openedAddTaskFormScheduleId).toEqual(null)

    scheduleStore.toggleAddTaskForm("65")

    expect(scheduleStore.openedAddTaskFormScheduleId).toEqual("65")

    scheduleStore.toggleAddTaskForm(null)

    expect(scheduleStore.openedAddTaskFormScheduleId).toEqual(null)

    scheduleStore.clearSchedulesAndForms()
  })

  it("adds and removes task to schedule", () => {
    scheduleStore.clearSchedulesAndForms()

    scheduleStore.addSchedule(scheduleWithoutTasks)

    expect(scheduleStore.schedules[0].tasks.length).toEqual(0)

    scheduleStore.addTaskToSchedule({
      scheduleId: scheduleStore.schedules[0].id,
      task
    })

    expect(scheduleStore.schedules[0].tasks.length).toEqual(1)

    scheduleStore.removeTaskFromSchedule({
      scheduleId: scheduleStore.schedules[0].id,
      taskId: task.id
    })

    expect(scheduleStore.schedules[0].tasks.length).toEqual(0)

    scheduleStore.clearSchedulesAndForms()
  })
})
