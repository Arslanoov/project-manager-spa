<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "Header"
})

export default class Header extends Vue {
  public ecosystem = [
    {
      text: "vuetify-loader",
      href: "https://github.com/vuetifyjs/vuetify-loader",
    },
    {
      text: "github",
      href: "https://github.com/vuetifyjs/vuetify",
    },
    {
      text: "awesome-vuetify",
      href: "https://github.com/vuetifyjs/awesome-vuetify",
    },
  ]

  public importantLinks = [
    {
      text: "Documentation",
      href: "https://vuetifyjs.com",
    },
    {
      text: "Chat",
      href: "https://community.vuetifyjs.com",
    },
    {
      text: "Made with Vuetify",
      href: "https://madewithvuejs.com/vuetify",
    },
    {
      text: "Twitter",
      href: "https://twitter.com/vuetifyjs",
    },
    {
      text: "Articles",
      href: "https://medium.com/vuetify",
    },
  ]

  public whatsNext = [
    {
      text: "Explore components",
      href: "https://vuetifyjs.com/components/api-explorer",
    },
    {
      text: "Select a layout",
      href: "https://vuetifyjs.com/getting-started/pre-made-layouts",
    },
    {
      text: "Frequently Asked Questions",
      href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
    },
  ]
}
</script>