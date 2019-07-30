const path = require('path')

module.exports = {
  publicPath: './',

  configureWebpack: config => {
    const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
    config.plugins.push(
      new MonacoWebpackPlugin({
        // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['javascript', 'typescript', 'json']
      })
    )
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0] = {
        ...args[0],
        title: 'vue-listview-generator',
        entrySpinner: require('fs').readFileSync(
          './src/constants/spinner.html',
          'utf-8'
        )
      }
      return args
    })

    config.module.rule('js').exclude.add(/public/)

    const svgIconPath = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg')
      .exclude.add(svgIconPath)
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(svgIconPath)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
