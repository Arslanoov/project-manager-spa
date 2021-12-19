<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__list-item">
        <img src="~@/assets/images/icons/nav/dashboard.svg" alt="">
      </li>
      <li class="nav__list-item">
        <img src="~@/assets/images/icons/nav/task.svg" alt="">
      </li>
      <li class="nav__list-item nav__list-item--plus">
        <img src="~@/assets/images/icons/nav/plus.svg" alt="">
      </li>
      <li class="nav__list-item">
        <img src="~@/assets/images/icons/nav/board.svg" alt="">
      </li>
      <li class="nav__list-item">
        <img src="~@/assets/images/icons/nav/message.svg" alt="">
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})

export default class Navigation extends Vue {

}
</script>

<style lang="scss" scoped>
.nav {
  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 4rem;

    list-style: none;

    &-item {
      width: 2.4rem;
      height: 2.4rem;

      @include pointer-on-hover();

      &--plus {
        width: 4.8rem;
        height: 4.8rem;
      }
    }
  }
}
</style>