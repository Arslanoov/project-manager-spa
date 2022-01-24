<template>
  <div @click="onSubmit" class="auth-method">
    <div class="auth-method__content">
      {{ action }} with
      <div class="auth-method__name">{{ name }}</div>
    </div>
    <div class="auth-method__submit">
      <img
        class="auth-method__icon"
        src="~@/assets/images/icons/arrow-right.svg"
        alt=""
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})

export default class AuthMethod extends Vue {
  @Prop([String]) readonly name: string | undefined
  @Prop([String]) readonly link: string | undefined
  @Prop([String]) readonly action: string | undefined

  public onSubmit() {
    this.$router.push(String(this.link))
  }
}
</script>

<style lang="scss" scoped>
.auth-method {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 1rem 1.5rem;

  background: #fff;

  @include pointer-on-hover();

  &,
  &__submit {
    border-radius: 1.4rem;
  }

  &__content {
    display: flex;
    align-items: center;

    font-size: 1.6rem;
  }

  &__name {
    margin-left: 2.2rem;

    font-weight: 500;
  }

  &__submit {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 5rem;
    height: 5rem;

    background: #F0F4FD;
  }

  &__icon {
    width: 1.4rem;
    height: 1.4rem;
  }
}
</style>