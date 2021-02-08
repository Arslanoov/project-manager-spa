import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import Alert from "@/store/modules/alert"

const Vue = createLocalVue()
Vue.use(Vuex)

const factory = () => {
  const store = new Vuex.Store({
    modules: {
      alert: Alert
    }
  })

  return getModule(Alert, store)
}

const alertStore = factory()

describe("User Store", () => {
  it("sets message", () => {
    const message = {
      message: "Some error",
      type: "error"
    }

    alertStore.setMessage(message)

    expect(alertStore.message).toEqual(message.message)
    expect(alertStore.type).toEqual(message.type)
  })

  it("clears message", () => {
    alertStore.clearMessage()

    expect(alertStore.message).toEqual(null)
    expect(alertStore.type).toEqual(null)
  })
})
