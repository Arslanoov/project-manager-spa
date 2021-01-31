import { VuexModule, Module, Mutation } from "vuex-module-decorators"

@Module({
  namespaced: true
  // Add for tests name: "nav"
  // TODO: Fix
})

class Nav extends VuexModule {
  public isShowNav = false

  @Mutation
  public toggleNavVisibility(): void {
    this.isShowNav = !this.isShowNav
  }
}

export default Nav
