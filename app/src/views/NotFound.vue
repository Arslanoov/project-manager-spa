<template>
  <v-container class="not-found-page" fill-height fluid>
    <v-row justify="center" align-self="center">
      <div class="message">
        <img class="not-found" src="~@/assets/404.svg" alt="404" />
        <v-btn
            color="success"
            class="button"
            @click="onGoHome"
        >
          Go Home
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { routesNames } from "@/router"

@Component({
  name: "NotFound"
})

export default class NotFound extends Vue {
  public onGoHome(): void {
    this.$router.push({
      name: routesNames.Home
    })
  }
}
</script>

<style lang="scss">
.not-found-page {
  margin-top: -64px;

  .message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>