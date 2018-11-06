import _ from 'lodash'

// 导入 editors 目录下所有 .vue 文件
const requireFiles = require.context('./editors', true, /\.vue$/)
const components: { [k: string]: any } = {}

requireFiles.keys().forEach(fileName => {
  // 以 pascalCase 命名作为 key 名存储
  const componentName = _.upperFirst(
    _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  components[componentName] = requireFiles(fileName).default
})

export default components
