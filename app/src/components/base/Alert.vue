<template>
  <v-alert
      v-if="message"
      class="alert"
      :type="errorTypes[type]"
      @input="clearMessage"
      dismissible
  >
    {{ message }}
  </v-alert>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {
  namespace
} from "vuex-class"

import AlertStoreModule from "@/store/modules/alert"

const alertModule = namespace("Alert")

@Component({
  name: "Alert"
})

export default class Alert extends Vue {
  @alertModule.State("message") message: string | null
  @alertModule.State("type") type: string | null

  @alertModule.Mutation("clearMessage") clearMessage: typeof AlertStoreModule.prototype.clearMessage

  public errorTypes = {
    error: "error"
  }
}
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 10px;
  right: 20px;

  min-width: 100px;
  max-width: 100%;

  z-index: 205;
}
</style>
