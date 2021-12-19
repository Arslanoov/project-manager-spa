<template>
  <div class="layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})

export default class AuthLayout extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;

  background-color: #F0F4FD;
}
</style>