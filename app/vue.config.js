module.exports = {
  "transpileDependencies": [
    "vuetify",
    "vuex-persist"
  ],
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    public: '0.0.0.0:8080'
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  }
}
