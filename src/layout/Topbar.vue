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
      <span :class="$style.act">
        <SvgIcon name="download"/>
        <span>导出配置</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { JSONfn } from '@/utils'
import prettier from 'prettier/standalone'
import parserBabylon from 'prettier/parser-babylon'
import json5 from 'json5'
import { version } from '../../package.json'

@Component
export default class Topbar extends Vue {
  public version = version

  checkCurConfig() {
    const propString = json5
      .stringify(
        this.$store.getters['listviewProps/result'],
        function(key, value) {
          return typeof value === 'function' ? value.toString() : value
        },
        2
      )
      .replace(/['"]function\s\w+\(/g, 'function(')
      .replace(/\}['"]/g, '}')
      .replace(/\\n/g, '\n')

    this.$store.dispatch('aceEditorDialog/show', {
      content: `const listviewProps = ${propString}`,
      width: 800,
      height: 500,
      readonly: true,
      title: '查看配置'
    })
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

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
  border-right: 1px solid darken(@topbar-background-color, 5);
  box-shadow: lighten(@topbar-background-color, 5) 0 0 0 1px;

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
.act {
  display: flex;
  align-items: center;
  padding: 0 1em;
  font-size: 14px;
  color: @topbar-text-color;
  cursor: pointer;

  svg {
    font-size: 16px;
  }

  span {
    padding-left: 5px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
