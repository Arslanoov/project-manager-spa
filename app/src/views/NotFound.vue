<template>
  <v-container class="not-found" fill-height fluid>
    <v-row justify="center" align-self="center">
      <div class="not-found__message">
        <img class="not-found__image" src="~@/assets/images/404.svg" alt="404" />
        <v-btn
            color="success"
            class="not-found__button"
            @click="onGoHome"
        >
          {{ $t("Go Home") }}
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import { routesNames } from "@/router/names"

@Component({
  name: "NotFound"
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
  margin-top: -64px;

  &__message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
