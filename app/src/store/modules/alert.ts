import { VuexModule, Module, Mutation } from "vuex-module-decorators"

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "alert" : undefined
})

class Alert extends VuexModule {
  public message: string | null = null
  public type: string | null = null

  @Mutation
  public setMessage(payload: {
    message: string,
    type: string
  }) {
    this.message = payload.message
    this.type = payload.type
  }

  @Mutation
  public clearMessage() {
    this.message = null
    this.type = null
  }
}

export default Alert
