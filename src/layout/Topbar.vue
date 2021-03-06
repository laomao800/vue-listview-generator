<template>
  <div :class="$style.topbar">
    <div :class="$style.logo">
      <span>Listview Generator</span>
      <small>v{{ version }}</small>
    </div>
    <div :class="$style.actionbar">
      <ElDropdown trigger="hover" placement="bottom-start" size="default" @command="handleCreate">
        <span :class="$style.act">
          <SvgIcon name="add-circle" />
          <span>项目</span>
        </span>
        <ElDropdownMenu slot="dropdown">
          <IconMenuItem command="new" icon="create" text="新建空白项目" />
          <IconMenuItem command="project" icon="object" text="从配置文件导入" />
          <IconMenuItem command="swagger" icon="swagger" text="从 Swagger 文档导入" />
          <IconMenuItem command="sample" icon="sun" text="加载演示项目《折扣管理》" divided />
        </ElDropdownMenu>
      </ElDropdown>

      <ElDropdown trigger="hover" placement="bottom-start" size="default" @command="checkCurConfig">
        <span :class="$style.act">
          <SvgIcon name="preview" />
          <span>检查配置</span>
        </span>
        <ElDropdownMenu slot="dropdown">
          <IconMenuItem command="config" icon="object" text="配置详情" />
          <IconMenuItem command="html" icon="html" text="HTML 页面" />
          <IconMenuItem command="vue" icon="vue" text="Vue 页面组件" />
        </ElDropdownMenu>
      </ElDropdown>

      <ElDropdown trigger="hover" placement="bottom-start" size="default" @command="handleExport">
        <span :class="$style.act">
          <SvgIcon name="download" />
          <span>导出</span>
        </span>
        <ElDropdownMenu slot="dropdown">
          <IconMenuItem command="project" icon="object" text="配置文件" />
          <IconMenuItem command="html" icon="html" text="HTML 页面" />
          <IconMenuItem command="vue" icon="vue" text="Vue 页面组件" />
        </ElDropdownMenu>
      </ElDropdown>

      <span :class="$style.act" @click="showPreview">
        <SvgIcon name="play" />
        <span>预览</span>
      </span>

      <span :class="$style.status" title="点击手动保存" @click="$store.dispatch('saveProject', true)">
        <span v-show="updateAt">上次保存：{{ updateAt }}</span>
        <i v-show="isLoading" class="el-icon-loading" />
      </span>
    </div>
    <div :class="[$style.actionbar, $style.right]">
      <a href="https://laomao800.github.io/vue-listview/" target="_blank" :class="$style.act">
        <SvgIcon name="question" />
        <span>Listview 文档</span>
      </a>
    </div>
  </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import download from 'downloadjs'
import dayjs from 'dayjs'
import json5 from 'json5'
import { mapFields } from 'vuex-map-fields'
import { version } from '@/../package.json'
import CodeDialogService from '@/service/CodeDialog'
import DialogService from '@/service/Dialog'
import SwaggerImporter from '@/components/SwaggerImporter/index.vue'
import { prettify } from '@/utils'

type ConfigContentType = 'project' | 'config' | 'html' | 'vue'

@Component
export default class Topbar extends Vue {
  public isPreview!: boolean
  public version: string = version

  get isLoading() {
    return this.$store.state.isLoading
  }

  get updateAt() {
    return this.$store.state.updateAt
      ? dayjs(this.$store.state.updateAt).format('YYYY-MM-DD HH:mm:ss')
      : null
  }

  showPreview() {
    this.$store.dispatch('preview', true)
  }

  async handleCreate(command: string) {
    try {
      await this.$confirm('当前工作区內的内容都会被覆盖，确认操作吗？', '', {
        type: 'warning'
      })
      switch (command) {
        case 'swagger':
          this.showSwaggerImporter()
          break
        case 'project':
          this.loadConfigFromLocal()
          break
        case 'sample':
          // @ts-ignore
          const sample = require('@/constants/sampleDiscount.json')
          this.$store.dispatch('loadAppState', sample)
          break
        case 'new':
          this.$store.dispatch('newProject')
          break
      }
    } catch (error) {}
  }

  showSwaggerImporter() {
    const vm = DialogService({
      content: (
        // @ts-ignore
        <SwaggerImporter
          style="width:1000px;height:600px;"
          on-success={(data: any) => {
            this.$store.dispatch('project/updateProject', data)
            this.$message.success('导入成功。')
            vm.hide()
          }}
        />
      )
    })
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

  applyProjectConfig(content: string) {
    try {
      this.$store.dispatch('loadAppState', content)
      // this.$message.success('配置导入成功。')
    } catch (error) {
      this.$message.error(`配置解析失败。 ${error}`)
    }
  }

  async checkCurConfig(type: ConfigContentType) {
    const content = await this.$store.dispatch('getConfigContent', type)
    const codeDialog = CodeDialogService({
      content,
      lang: type === 'config' ? 'javascript' : 'html',
      width: '80%',
      height: 500,
      readonly: true,
      useWorker: false,
      title: '检查配置',
      buttons: [
        { text: '关闭', click: () => codeDialog.hide() },
        {
          text: '导出',
          type: 'primary',
          click: () => this.downloadFile(type, content)
        }
      ]
    })
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
    const fileContent =
      content || (await this.$store.dispatch('getConfigContent', type))
    if (fileContent && exportFileName) {
      download(fileContent, exportFileName, 'text/plain')
    }
  }

  saveProject() {
    this.$store.dispatch('saveProject')
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
.status {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 12px;
  color: #fff;
  cursor: default;
  opacity: 0.5;

  &:hover {
    opacity: 0.6;
  }
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
</style>
