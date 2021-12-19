<template>
  <div class="auth-method">
    <div class="auth-method__content">
      {{ name }}
    </div>
    <div @click="onSubmit" class="auth-method__submit">
      ->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})

export default class AuthMethod extends Vue {
  @Prop([String]) readonly name: string | undefined
  @Prop([String]) readonly link: string | undefined

  public onSubmit() {
    this.$router.push(String(this.link))
  }
}
</script>

<style lang="scss" scoped>
.auth-method {
  &__content {

  }

  &__submit {

  }
}
</style>