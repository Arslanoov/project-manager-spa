import { shallowMount, createLocalVue } from "@vue/test-utils"

import Alert from "@/components/base/Alert.vue"
import AlertModule from "@/store/modules/alert"

const localVue = createLocalVue()

import Vuex from "vuex"

localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Alert: AlertModule
  }
})

describe("Alert component", () => {
  const message = "Error text"
  const type = "error"

  it("show error", () => {
    store.commit("Alert/setMessage", {
      message,
      type
    })

    const wrapper = shallowMount(Alert, { store, localVue })
    const p = wrapper.find(".alert")

    expect(p.exists()).toBe(true)
    expect(p.text()).toBe(message)
  })

  it("doesn't show error", () => {
    store.commit("Alert/clearMessage")

    const wrapper = shallowMount(Alert, { store, localVue })

    expect(wrapper.find(".alert").exists()).toBe(false)
  })
})
