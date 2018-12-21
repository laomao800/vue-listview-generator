module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0] = {
        ...args[0],
        title: 'vue-listview-editor',
        entrySpinner: require('fs').readFileSync(
          './src/constants/spinner.html',
          'utf-8'
        )
      }
      return args
    })
    config.module.rule('js').exclude.add(/public/)
  }
}
