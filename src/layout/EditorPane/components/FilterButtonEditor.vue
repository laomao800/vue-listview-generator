<template>
  <ElPopover
    v-model="visible"
    :offset="-10"
    placement="right-start"
    width="200"
    trigger="click"
    transition
  >
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more"/>
      </span>
    </slot>
    <div style="margin:-12px;padding:6px 0;">
      <FieldInput
        ref="focusInput"
        v-model="editingData.text"
        title="按钮文本"
        placeholder="按钮文本"
        maxlength="16"
      />

      <FieldDivider title="按钮样式"/>

      <FieldButtonType v-model="editingData.type" :plain="editingData.plain"/>
      <FieldIcons title="按钮图标" v-model="editingData.icon"/>
      <FieldItemBasic title="线框型按钮" @click.native="$set(editingData, 'plain', !editingData.plain)">
        <ElSwitch :value="editingData.plain" size="mini"/>
      </FieldItemBasic>

      <FieldDivider title="操作"/>

      <FieldItemBasic icon="copy" title="复制" @click.native="emitCopy"/>
      <FieldItemBasic icon="delete" title="删除" @click.native="emitDelete"/>
    </div>
  </ElPopover>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import PopEditorBase from '../PopEditorBase'

@Component
export default class FilterButtonEditor extends PopEditorBase {}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.more {
  padding: 2px;
  color: #999;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background: @color-gray-light-2;
  }
}
</style>
