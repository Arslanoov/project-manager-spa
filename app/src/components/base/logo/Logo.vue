<template>
  <div @click="onClick" class="logo">
    <img class="logo__image" src="~@/assets/images/logo.svg" alt="Logo" draggable="false">
    <h1 class="logo__title">{{ appName }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { routesNames } from "@/router/names"

import { APP_NAME } from "@/const/app"

@Component({})

export default class Logo extends Vue {
  public appName = APP_NAME

  public onClick() {
    this.$router.push({
      name: routesNames.AuthHome
      // TODO: Fix
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).catch(() => {})
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;

  gap: 2rem;

  @include pointer-on-hover();
  @include no-select();

  &__image {
    width: 6.5rem;
  }

  &__title {
    font-size: 3.5rem;
    font-weight: 500;

    color: #0A204B;
  }
}
</style>