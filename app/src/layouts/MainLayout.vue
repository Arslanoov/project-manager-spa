<template>
  <v-main>
    <Header />
    <router-view></router-view>
    <Alert />
  </v-main>
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
