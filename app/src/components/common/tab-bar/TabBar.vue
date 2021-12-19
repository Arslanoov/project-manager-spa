<template>
  <div class="tab-bar">
    <div class="tab-bar__space" />
    <div class="tab-bar__wrapper">
      <div class="tab-bar__overlay" />
      <footer class="tab-bar__content">
        <Navigation />
      </footer>
    </div>
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
    height: 12rem;
  }

  &__wrapper {
    position: fixed;

    bottom: 0;
    left: 0;
    right: 0;
  }

  &__content {
    padding-top: 3.5rem;

    background: #5A55CA url("~@/assets/images/background.svg") no-repeat left top;
    background-size: cover;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 3.5rem;

    background: #F0F4FD;

    border-bottom-left-radius: 4rem;
    border-bottom-right-radius: 4rem;
  }
}
</style>