<template>
  <div :class="$style.topbar">
    <div :class="$style.logo">
      <span>Listview Editor</span>
      <small>v{{ version }}</small>
    </div>
    <div :class="$style.actionbar">
      <span :class="$style.act">
        <SvgIcon name="play"/>
        <span>预览</span>
      </span>
      <span :class="$style.act" @click="checkCurConfig">
        <SvgIcon name="preview"/>
        <span>查看配置</span>
      </span>

      <ElDropdown trigger="click" placement="bottom-start" size="default">
        <span :class="$style.act">
          <SvgIcon name="download"/>
          <span>导出</span>
        </span>
        <ElDropdownMenu slot="dropdown" @command="handleExport">
          <ElDropdownItem command="config">
            <SvgIcon name="object" :class="$style['menu-icon']"/>配置文件
          </ElDropdownItem>
          <ElDropdownItem command="vue">
            <SvgIcon name="vue" :class="$style['menu-icon']"/>Vue 页面组件
          </ElDropdownItem>
          <ElDropdownItem command="html">
            <SvgIcon name="html" :class="$style['menu-icon']"/>HTML 页面
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
import { version } from '../../package.json'
import codeDialogServices from '@/service/CodeDialog'
import { prettify } from '@/utils'

@Component
export default class Topbar extends Vue {
  public version = version

  async checkCurConfig() {
    const configString = await this.$store.dispatch('getConfigString')
    const configDialog = codeDialogServices({
      content: prettify(`const configs = ${configString}`),
      width: '80%',
      height: 500,
      readonly: true,
      title: '查看配置',
      buttons: [{ text: '取消', click: () => configDialog.hide() }]
    })
  }

  handleExport(command: string) {
    switch (command) {
      case 'config':
        break
      case 'vue':
        break
      case 'html':
        break
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
