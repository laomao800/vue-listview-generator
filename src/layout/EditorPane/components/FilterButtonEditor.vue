<template>
  <PopEditorWrap v-model="visible">
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
  </PopEditorWrap>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import PopEditorBase from '../PopEditorBase'
import PopEditorWrap from '@/layout/EditorPane/components/PopEditorWrap.vue'

@Component({
  components: {
    PopEditorWrap
  }
})
export default class FilterButtonEditor extends PopEditorBase {}
</script>
