module.exports = {
  transpileDependencies: ['webpack-dev-server/client'],
  chainWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js'];
  },
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  css: {
    extract:  ['production', 'development'].includes(process.env.NODE_ENV),
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}

