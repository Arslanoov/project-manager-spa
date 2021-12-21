x<template>
  <v-container class="access-denied" fill-height fluid>
    <v-row justify="center" align-self="center">
      <div class="access-denied__message">
        <h1>403</h1>
        <v-alert
            v-if="error"
             class="access-denied__alert"
             border="bottom"
             color="pink darken-1"
             dark>
          {{ error }}
        </v-alert>
        <v-btn
            color="success"
            class="access-denied__button"
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
  name: "AccessDenied"
})

export default class AccessDenied extends Vue {
  public error = this.$route.query.error

  public onGoHome(): void {
    this.$router.push({
      name: routesNames.Board
    })
  }
}
</script>

<style lang="scss" scoped>
.access-denied {
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
