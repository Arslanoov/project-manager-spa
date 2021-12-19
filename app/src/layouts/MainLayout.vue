<template>
  <router-view></router-view>
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
