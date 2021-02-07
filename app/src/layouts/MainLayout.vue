<template>
  <v-main>
    <Header />
    <router-view></router-view>
  </v-main>
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
