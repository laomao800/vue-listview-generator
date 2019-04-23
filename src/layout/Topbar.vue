<template>
  <div :class="$style.topbar">
    <div :class="$style.logo">
      <span>Listview Generator</span>
      <small>v{{ version }}</small>
    </div>
    <div :class="$style.actionbar">
      <ElDropdown trigger="hover" placement="bottom-start" size="default" @command="handleCreate">
        <span :class="$style.act">
          <SvgIcon name="add-circle"/>
          <span>项目</span>
        </span>
        <ElDropdownMenu slot="dropdown">
          <ElDropdownItem command="new">
            <SvgIcon name="create" :class="$style['menu-icon']"/>新建
          </ElDropdownItem>
          <ElDropdownItem command="config">
            <SvgIcon name="object" :class="$style['menu-icon']"/>从配置文件导入
          </ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>

      <ElDropdown trigger="hover" placement="bottom-start" size="default" @command="checkCurConfig">
        <span :class="$style.act">
          <SvgIcon name="preview"/>
          <span>检查配置</span>
        </span>
        <ElDropdownMenu slot="dropdown">
          <ElDropdownItem command="config">
            <SvgIcon name="object" :class="$style['menu-icon']"/>配置详情
          </ElDropdownItem>
          <ElDropdownItem command="html">
            <SvgIcon name="html" :class="$style['menu-icon']"/>HTML 页面
          </ElDropdownItem>
          <ElDropdownItem command="vue">
            <SvgIcon name="vue" :class="$style['menu-icon']"/>Vue 页面组件
          </ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>

      <ElDropdown trigger="hover" placement="bottom-start" size="default" @command="handleExport">
        <span :class="$style.act">
          <SvgIcon name="download"/>
          <span>导出</span>
        </span>
        <ElDropdownMenu slot="dropdown">
          <ElDropdownItem command="project">
            <SvgIcon name="object" :class="$style['menu-icon']"/>配置文件
          </ElDropdownItem>
          <ElDropdownItem command="html">
            <SvgIcon name="html" :class="$style['menu-icon']"/>HTML 页面
          </ElDropdownItem>
          <ElDropdownItem command="vue">
            <SvgIcon name="vue" :class="$style['menu-icon']"/>Vue 页面组件
          </ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>

      <span :class="$style.act" @click="showPreview">
        <SvgIcon name="play"/>
        <span>预览</span>
      </span>
    </div>
    <div :class="[$style.actionbar, $style.right]">
      <a href="https://laomao800.github.io/vue-listview/" target="_blank" :class="$style.act">
        <SvgIcon name="question"/>
        <span>Listview 文档</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import download from 'downloadjs'
import json5 from 'json5'
import { mapFields } from 'vuex-map-fields'
import { version } from '@/../package.json'
import codeDialogServices from '@/service/CodeDialog'
import { prettify } from '@/utils'

type ConfigContentType = 'project' | 'config' | 'html' | 'vue'

function simpleTpl(content: string, variables: any) {
  const keys = Object.keys(variables)
  const reg = new RegExp(`<%= ?(${keys.join('|')}) ?%>`, 'g')
  return content.replace(reg, function(match, p1) {
    return variables[p1] || ''
  })
}

// eslint-disable-next-line import/no-webpack-loader-syntax
const templateContentMap: any = {
  html: require(`!!raw-loader!@/constants/exportTemplate/html.tpl`).default,
  vue: require(`!!raw-loader!@/constants/exportTemplate/vue.tpl`).default
}

@Component({
  computed: {
    ...mapFields('app', ['isPreview']),
    ...mapFields('workspace', ['listviewVersion'])
  }
})
export default class Topbar extends Vue {
  public isPreview!: boolean
  public listviewVersion!: string
  public version: string = version

  showPreview() {
    this.isPreview = true
  }

  handleCreate(command: string) {
    if (command === 'config') {
      this.loadConfigFromLocal()
    }
  }

  applyProjectConfig(content: string) {
    try {
      const loadedState = JSON.parse(content)
      const newState = {
        ...this.$store.state,
        ...loadedState
      }
      this.$store.replaceState(newState)
      this.$message.success('配置加载成功。')
    } catch (e) {
      this.$message.error('配置解析失败。')
    }
  }

  loadConfigFromLocal() {
    const vm = this
    const $file = document.createElement('input')
    $file.setAttribute('type', 'file')
    $file.setAttribute('accept', '.json')
    $file.addEventListener('change', function() {
      if (this.files) {
        const file = this.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function(e: any) {
          const content = e.target.result
          vm.applyProjectConfig(content)
        }
      }
    })
    $file.click()
  }

  async checkCurConfig(type: ConfigContentType) {
    const content = await this.getConfigContent(type)
    const configDialog = codeDialogServices({
      content,
      lang: type === 'config' ? 'javascript' : 'html',
      width: '80%',
      height: 500,
      readonly: true,
      useWorker: false,
      title: '检查配置',
      buttons: [
        { text: '关闭', click: () => configDialog.hide() },
        {
          text: '导出',
          type: 'primary',
          click: () => this.downloadFile(type, content)
        }
      ]
    })
  }

  async getConfigContent(type: ConfigContentType): Promise<string> {
    // prettier-ignore
    const configString = await this.$store.dispatch('app/getProjectConfigString')
    let content = ''
    switch (type) {
      case 'project':
        content = JSON.stringify(this.$store.state)
        break
      case 'config':
        content = prettify(`const listviewProps = ${configString}`)
        break
      case 'html':
      case 'vue':
        const templateContent = templateContentMap[type]
        content = simpleTpl(templateContent, {
          listviewConfig: configString,
          listviewVersion: this.listviewVersion
        })
        content = prettify(content, {
          parser: type
        })
        break
    }
    return content
  }

  async handleExport(type: ConfigContentType) {
    this.downloadFile(type)
  }

  async downloadFile(type: ConfigContentType, content?: string) {
    let exportFileName = null
    switch (type) {
      case 'project':
        exportFileName = `listview_${+new Date()}.json`
        break
      case 'html':
      case 'vue':
        exportFileName = `listview_page_${+new Date()}.${type}`
    }
    const fileContent = content || (await this.getConfigContent(type))
    if (fileContent && exportFileName) {
      download(fileContent, exportFileName, 'text/plain')
    }
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.shadow-border-left() {
  border-left: 1px solid lighten(@topbar-background-color, 5);
  box-shadow: darken(@topbar-background-color, 5) 0 0 0 1px;
}
.shadow-border-right() {
  border-right: 1px solid darken(@topbar-background-color, 5);
  box-shadow: lighten(@topbar-background-color, 5) 0 0 0 1px;
}

.topbar {
  display: flex;
  height: 50px;
  text-shadow: darken(@topbar-background-color, 8) 1px 1px 0;
  background-color: @topbar-background-color;
}
.logo {
  display: flex;
  align-items: center;
  padding: 0 1em;
  font-size: 20px;
  color: @logo-text-color;
  cursor: default;
  user-select: none;
  .shadow-border-right();

  small {
    padding-left: 0.2em;
    margin-right: -30%;
    color: #ffc107;
    transform: scale(0.7);
    transform-origin: 0 100%;
  }
}
.actionbar {
  display: flex;
}
.right {
  margin-left: auto;
  .shadow-border-left();
}
.act {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1em;
  font-size: 14px;
  color: @topbar-text-color;
  text-decoration: none;
  cursor: pointer;

  svg {
    font-size: 16px;
  }

  span {
    padding-left: 5px;
  }

  &:hover {
    color: @topbar-text-color;
    background-color: rgba(255, 255, 255, 0.1);
  }
}
.menu-icon {
  margin-right: 5px;
  font-size: 18px;
}
</style>
