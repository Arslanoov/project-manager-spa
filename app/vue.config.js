module.exports = {
  "transpileDependencies": [
    "vuex-persist"
  ],

  devServer: {
    host: "0.0.0.0",
    port: "8080",
    public: "0.0.0.0:8080"
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: "@import \"@/assets/styles/main\";"
      }
    }
  },

  chainWebpack: config => {
    config.plugins.delete("prefetch")
    config
      .plugin("html")
      .tap(args => {
        args[0].title = "Project Manager"
        return args
      })
  },

  configureWebpack: {
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
}
