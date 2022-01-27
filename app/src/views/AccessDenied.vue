<template>
  <auth-layout>
    <div class="access-denied">
      <h2 class="access-denied__code">403</h2>

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
  name: "AccessDenied",
  components: {
    AuthLayout,
    FormButton
  }
})

export default class AccessDenied extends Vue {
  public onGoHome(): void {
    this.$router.push({
      name: routesNames.Board
    })
  }
}
</script>

<style lang="scss" scoped>
.access-denied {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__code {
    font-size: 5rem;
    font-weight: 600;
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
