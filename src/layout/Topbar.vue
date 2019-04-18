<template>
  <div :class="$style.topbar">
    <div :class="$style.logo">
      <span>Listview Editor</span>
      <small>v{{ version }}</small>
    </div>
    <div :class="$style.actionbar">
      <span :class="$style.act" @click="showPreview">
        <SvgIcon name="play"/>
        <span>预览</span>
      </span>

      <ElDropdown trigger="click" placement="bottom-start" size="default" @command="checkCurConfig">
        <span :class="$style.act">
          <SvgIcon name="preview"/>
          <span>检查配置</span>
        </span>
        <ElDropdownMenu slot="dropdown">
          <ElDropdownItem command="html">
            <SvgIcon name="html" :class="$style['menu-icon']"/>HTML 页面
          </ElDropdownItem>
          <ElDropdownItem command="vue">
            <SvgIcon name="vue" :class="$style['menu-icon']"/>Vue 页面组件
          </ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>

      <ElDropdown trigger="click" placement="bottom-start" size="default" @command="handleExport">
        <span :class="$style.act">
          <SvgIcon name="download"/>
          <span>导出</span>
        </span>
        <ElDropdownMenu slot="dropdown">
          <ElDropdownItem command="config">
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
import { version as listviewVersion } from '@laomao800/vue-listview/package.json'

type ConfigContentType = 'config' | 'html' | 'vue'

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
    ...mapFields('app', ['isPreview'])
  }
})
export default class Topbar extends Vue {
  public isPreview!: boolean
  public version = version

  showPreview() {
    this.isPreview = true
  }

  async checkCurConfig(type: ConfigContentType) {
    let content = await this.getConfigContent(type)
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
          click: () => this.handleExport(type, content)
        }
      ]
    })
  }

  async handleExport(type: ConfigContentType, content: string) {
    let exportFileName = null
    switch (type) {
      case 'config':
        exportFileName = `listview_config_${+new Date()}.json`
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

  async getConfigContent(type: ConfigContentType): Promise<string> {
    let content = ''
    switch (type) {
      case 'config':
        content = JSON.stringify({
          version,
          listviewVersion,
          data: json5.stringify(this.$store.state.project)
        })
        break
      case 'html':
      case 'vue':
        // prettier-ignore
        const configString = await this.$store.dispatch('app/getProjectConfigString')
        const templateContent = templateContentMap[type]
        content = simpleTpl(templateContent, {
          listviewConfig: configString,
          listviewVersion
        })
        content = prettify(content, {
          parser: type
        })
        break
    }
    return content
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
