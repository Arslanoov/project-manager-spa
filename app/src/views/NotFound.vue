<template>
  <auth-layout>
    <div class="not-found">
      <h2 class="not-found__code">404</h2>

      <FormButton
        @form-submit="onGoHome"
        :name="$t('Home')"
      />
    </div>
  </auth-layout>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import { routesNames } from "@/router/names"

import AuthLayout from "@/layouts/AuthLayout.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"

@Component({
  name: "NotFound",
  components: {
    AuthLayout,
    FormButton
  }
})

export default class NotFound extends Vue {
  public onGoHome(): void {
    this.$router.push({
      name: routesNames.Board
    })
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__code {
    font-size: 5rem;
    font-weight: $semi-bold;
  }
}
</style>

<i18n>
{
  "en": {
    "Go Home": "Go Home"
  },
  "ru": {
    "Go Home": "Домой"
  }
}
</i18n>
