import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import Task from "@/store/modules/task"
import StepInterface from "@/types/schedule/task/StepInterface"

const Vue = createLocalVue()
Vue.use(Vuex)

const factory = () => {
  const store = new Vuex.Store({
    modules: {
      task: Task
    }
  })

  return getModule(Task, store)
}

const taskStore = factory()

const steps: Array<StepInterface> = [
  {
    id: 1,
    name: "step_name",
    sort_order: "0",
    status: "Complete"
  }
]

describe("Task Store", () => {
  it("sets current task", () => {
    const taskId = "someId"
    taskStore.setCurrentTask(taskId)

    expect(taskStore.currentTaskId).toEqual(taskId)
    expect(taskStore.currentStepForm.taskId).toEqual(taskId)
  })

  it("sets current task steps", () => {
    taskStore.setCurrentTaskSteps(steps)

    expect(taskStore.currentTaskSteps).toEqual(steps)
    expect(taskStore.currentTaskSteps.length).toEqual(1)
  })

  it("change current task step status", () => {
    const newStatus = "Not Complete"
    taskStore.changeCurrentTaskStepStatus({
      id: steps[0].id,
      newStatus
    })

    expect(taskStore.currentTaskSteps[0].status).toEqual(newStatus)
  })

  it("change current task steps statuses", () => {
    const newStatus = "Some status"
    taskStore.changeCurrentTaskStepsStatus({
      ids: [steps[0].id],
      newStatus
    })

    expect(taskStore.currentTaskSteps[0].status).toEqual(newStatus)
  })

  it("removes current task step", () => {
    expect(taskStore.currentTaskSteps.length).toEqual(1)

    taskStore.removeCurrentTaskStep(steps[0].id)

    expect(taskStore.currentTaskSteps.length).toEqual(0)
  })

  it("adds step to current task", () => {
    const prevLength: number = taskStore.currentTaskSteps.length

    taskStore.addCurrentTaskStep(steps[0])

    expect(taskStore.currentTaskSteps).toEqual([ steps[0] ])

    expect(taskStore.currentTaskSteps.length).toEqual(prevLength + 1)
  })

  it("clears current task", () => {
    taskStore.clearCurrentTask()

    expect(taskStore.currentTaskSteps).toEqual([])
    expect(taskStore.currentTaskSteps.length).toEqual(0)

    expect(taskStore.currentTaskId).toEqual(null)
  })

  it("toggles steps dialog", () => {
    expect(taskStore.isOpenedStepsDialog).toEqual(false)

    taskStore.openStepsDialog()

    expect(taskStore.isOpenedStepsDialog).toEqual(true)

    taskStore.closeStepsDialog()

    expect(taskStore.isOpenedStepsDialog).toEqual(false)
  })

  it("toggles add step dialog", () => {
    expect(taskStore.isOpenedAddStepDialog).toEqual(false)

    taskStore.toggleAddStepDialog()

    expect(taskStore.isOpenedAddStepDialog).toEqual(true)

    taskStore.toggleAddStepDialog()

    expect(taskStore.isOpenedAddStepDialog).toEqual(false)
  })

  it("sets add step form name", () => {
    const name = "some name"

    taskStore.setAddStepFormName(name)

    expect(taskStore.currentStepForm.name).toEqual(name)
  })

  it("clears step form", () => {
    taskStore.clearCurrentStepForm()

    expect(taskStore.currentStepForm.name).toEqual("")
  })
})
