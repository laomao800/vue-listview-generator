// 自动注册 `store/modules` 目录下的文件为 Vuex 模块。
// 模块默认开启 namespaced ，并以文件名的驼峰格式作为其命名空间。

import _ from 'lodash'
import { ModuleTree } from 'vuex'

interface ModuleWrap {
  modules: ModuleTree<any>
}

// 递归获取各子目录模块命名空间
function getNamespace(subtree: ModuleWrap, path: string[]): ModuleWrap {
  if (path.length === 1) return subtree

  const namespace = path.shift() as string
  subtree.modules[namespace] = {
    modules: {},
    namespaced: true,
    ...subtree.modules[namespace]
  }
  return getNamespace(subtree.modules[namespace] as ModuleWrap, path)
}

const root: ModuleWrap = {
  modules: {}
}

// 查找当前目录下所有的非单元测试 js 文件
const requireModule = require.context('.', true, /^((?!index|\.unit\.).)*\.ts$/)

requireModule.keys().forEach((fileName: string) => {
  // 拆分文件路径，并以驼峰格式存储各路径层次名至数组
  const modulePath = fileName
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
    .split(/\//)
    .map(_.camelCase)

  // 从当前路径获取模块内容
  const { modules } = getNamespace(root, modulePath)

  // 添加获取到的模块内容
  modules[modulePath.pop() as string] = {
    namespaced: true,
    ...requireModule(fileName)
  }
})

export default root.modules
