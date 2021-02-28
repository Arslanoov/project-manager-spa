<template>
  <v-container class="access-denied-page" fill-height fluid>
    <v-row justify="center" align-self="center">
      <div class="message">
        <h1>403</h1>
        <v-alert
            v-if="error"
             class="alert"
             border="bottom"
             color="pink darken-1"
             dark>
          {{ error }}
        </v-alert>
        <v-btn
            color="success"
            class="button"
            @click="onGoHome"
        >
          $t("Go Home")
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
      name: routesNames.Home
    })
  }
}
</script>

<style lang="scss">
.access-denied-page {
  margin-top: -64px;

  .message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>

<i18n>
{
  "ru": {
    "Go Home": "Домой"
  }
}
</i18n>
