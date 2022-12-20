const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  server: {
    proxy: {
      "/api": {
        target: "https://smms.app",
        changeOrigin: true,
        secure: false,
        headers: {
          Referer: "https://smms.app",
        },
      },
    },
  },
})
