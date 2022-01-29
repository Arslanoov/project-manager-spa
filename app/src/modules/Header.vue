<template>
  <header class="header">
    <div :class="withBackground && 'header__content_covered'" class="header__content">
      <div @click="goBack" class="header__nav">
        <img v-if="withBackground" class="header__back" src="~@/assets/images/icons/back.svg" alt="back">
        <img v-else class="header__back" src="~@/assets/images/icons/back_black.svg" alt="back">
        <div class="header__title">{{ title }}</div>
      </div>
    </div>
    <div v-if="withBackground" class="header__overlay" />
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

/**
 * Header
 * @version 1.0.0
 */
@Component({})

export default class Header extends Vue {
  @Prop([String]) readonly title: string | undefined
  @Prop({ default: true, type: [Boolean] }) readonly withBackground: boolean | undefined

  public goBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  &__content {
    width: 100%;
    height: 9rem;

    padding: 3rem 2.4rem 0;

    z-index: -1;

    color: #000;

    &_covered {
      height: 12rem;

      padding: 3rem 2.4rem;

      background: #5A55CA url("~@/assets/images/background.svg") no-repeat left top;
      background-size: cover;

      color: #fff;
    }
  }

  &__nav {
    display: flex;
    align-items: center;

    @include pointer-on-hover();
  }

  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 3rem;

    background: #F0F4FD;

    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
  }

  &__back {
    height: 2.3rem;
  }

  &__title {
    margin-left: 1.6rem;

    font-size: 2.4rem;
    font-weight: 700;
  }
}
</style>