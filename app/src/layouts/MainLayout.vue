<template>
  <div class="main-layout">
    <Header v-if="withHeader" />
    <div class="container">
      <div class="main-layout__content">
        <router-view></router-view>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Header from "@/modules/Header.vue"
import TabBar from "@/components/common/tab-bar/TabBar.vue"

@Component({
  components: {
    Header,
    TabBar
  }
})

export default class MainLayout extends Vue {
  public get withHeader() {
    return this.$route.meta.withHeader ?? false
  }
}
</script>

<style lang="scss" scoped>
.main-layout {
  position: relative;

  min-height: 100vh;

  padding: 1.5rem 0;

  background-color: #F0F4FD;

  &__content {
    grid-column: col-start 1 / col-end 12;

    padding-top: .5rem;
  }
}
</style>