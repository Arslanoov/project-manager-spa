import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import Nav from "@/store/modules/nav"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"

const Vue = createLocalVue()
Vue.use(Vuex)

const factory = () => {
  const store = new Vuex.Store({
    modules: {
      nav: Nav
    }
  })

  return getModule(Nav, store)
}

const navStore = factory()

const customSchedule: ScheduleInterface = {
  id: "id",
  name: "Custom",
  date: {
    day: 2,
    month: 5,
    year: 2020,
    string: "string"
  },
  tasksCount: 0,
  tasks: []
}

describe("Nav Store", () => {
  it("toggles nav visibility", () => {
    expect(navStore.isShowNav).toEqual(false)

    navStore.toggleNavVisibility()

    expect(navStore.isShowNav).toEqual(true)

    navStore.toggleNavVisibility()

    expect(navStore.isShowNav).toEqual(false)
  })

  it("toggles custom schedule add form", () => {
    expect(navStore.isOpenAddCustomScheduleForm).toEqual(false)

    navStore.toggleAddCustomScheduleForm()

    expect(navStore.isOpenAddCustomScheduleForm).toEqual(true)

    navStore.toggleAddCustomScheduleForm()

    expect(navStore.isOpenAddCustomScheduleForm).toEqual(false)
  })

  it("sets custom schedules", () => {
    navStore.setCustomSchedules([ customSchedule ])

    expect(navStore.customSchedules).toEqual([ customSchedule ])
    expect(navStore.customSchedules.length).toEqual(1)
  })

  it("adds custom schedule", () => {
    const prevLength: number = navStore.customSchedules.length
    navStore.addCustomSchedule(customSchedule)

    expect(navStore.customSchedules.length).toEqual(prevLength + 1)
  })

  it("sets custom schedule form name", () => {
    const newName = "someName"
    navStore.setCustomScheduleFormName(newName)

    expect(navStore.addCustomScheduleForm.name).toEqual(newName)
  })

  it("deletes custom schedule form name", () => {
    const prevLength: number = navStore.customSchedules.length
    navStore.deleteCustomSchedule(customSchedule.id)

    expect(navStore.customSchedules.length).toEqual(prevLength - 1)
  })

  it("changes language", () => {
    expect(navStore.language).toEqual("ru")

    navStore.changeLanguage("en")

    expect(navStore.language).toEqual("en")
  })
})
