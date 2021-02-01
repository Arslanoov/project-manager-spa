import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import Schedule from "@/store/modules/schedule"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import TaskInterface, {TaskForm} from "@/types/schedule/task/TaskInterface";

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

  it("toggles add task form dialog", () => {
    expect(scheduleStore.openedAddTaskFormScheduleId).toEqual(null)

    scheduleStore.toggleAddTaskForm("65")

    expect(scheduleStore.openedAddTaskFormScheduleId).toEqual("65")

    scheduleStore.toggleAddTaskForm(null)

    expect(scheduleStore.openedAddTaskFormScheduleId).toEqual(null)
  })

  // TODO: Finish test
  it("adds and removes task to schedule", () => {
    const scheduleId = "scheduleId"

    expect(scheduleStore.schedules[0].tasks.length).toEqual(0)

    const task: TaskInterface = {
      id: "someid",
      name: "task",
      description: "desc",
      importantLevel: "Important",
      status: "Not Finished",
      stepsCount: 0,
      finishedSteps: 0
    }

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
  })
})
