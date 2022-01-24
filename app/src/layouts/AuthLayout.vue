<template>
  <div class="layout">
    <Logo class="layout__logo" />

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Logo from "@/components/base/logo/Logo.vue"

@Component({
  components: {
    Logo
  },
})

export default class AuthLayout extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;

  min-height: 100vh;

  background-color: #F0F4FD;

  &__logo {
    align-self: center;

    margin: 4rem 0;
  }
}
</style>