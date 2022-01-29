<template>
  <div class="main-layout">
    <slot name="header"></slot>
    <div class="container">
      <div class="main-layout__content">
        <main>
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Header from "@/modules/Header.vue"

@Component({
  components: {
    Header,
  }
})

export default class MainLayout extends Vue {
}
</script>

<style lang="scss" scoped>
.main-layout {
  position: relative;

  min-height: 100vh;

  background-color: #F0F4FD;

  &__content {
    grid-column: col-start 1 / col-end 12;

    padding: 1.5rem 0;
  }
}
</style>