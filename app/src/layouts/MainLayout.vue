<template>
  <v-app>
    <Header />
    <v-body>
      <router-view></router-view>
    </v-body>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Header from "@/modules/Header.vue"

@Component({
  components: {
    Header
  }
})

export default class MainLayout extends Vue {

}
</script>