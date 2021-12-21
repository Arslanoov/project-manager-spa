<template>
  <div class="tab-bar">
    <div class="tab-bar__space" />
    <footer class="tab-bar__content">
      <Navigation />
    </footer>
  </div>
</template>

<script lang="ts">
// TODO: Move to modules folder

import { Component, Vue } from "vue-property-decorator"

import Navigation from "@/components/common/navigation/Navigation.vue"

@Component({
  components: {
    Navigation
  }
})

export default class TabBar extends Vue {

}
</script>

<style lang="scss" scoped>
.tab-bar {
  width: 100%;

  &__space,
  &__content {
    height: 9rem;
  }

  &__content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    background: #5A55CA url("~@/assets/images/background.svg") no-repeat left top;
    background-size: cover;

    padding: .5rem 0;
  }
}
</style>