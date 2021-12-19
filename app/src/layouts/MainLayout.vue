<template>
  <v-app>
    <v-main>
      <Header />
      <router-view></router-view>
      <Alert />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Header from "@/modules/Header.vue"

import Alert from "@/components/base/Alert.vue"

@Component({
  components: {
    Header,
    Alert
  }
})

export default class MainLayout extends Vue {

}
</script>
