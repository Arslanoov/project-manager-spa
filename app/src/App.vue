<template>
  <v-app>
    <MainLayout />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import MainLayout from "@/layouts/MainLayout.vue"

@Component({
  name: "App",
  components: {
    MainLayout
  }
})

export default class App extends Vue {

}
</script>
