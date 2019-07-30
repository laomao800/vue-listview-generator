<template>
  <PopEditorWrap v-model="visible">
    <EditorItemInput
      ref="focusInput"
      v-model="editingData.text"
      title="按钮文本"
      placeholder="按钮文本"
      maxlength="16"
    />

    <EditorItemDivider title="按钮样式" />

    <EditorItemButtonType v-model="editingData.type" :plain="editingData.plain" />
    <EditorItemIcons title="按钮图标" v-model="editingData.icon" />
    <EditorItemBase title="线框型按钮" @click.native="$set(editingData, 'plain', !editingData.plain)">
      <ElSwitch :value="editingData.plain" size="mini" />
    </EditorItemBase>

    <EditorItemDivider title="操作" />

    <EditorItemBase icon="copy" title="复制" @click.native="emitCopy" />
    <EditorItemBase icon="delete" title="删除" @click.native="emitDelete" />
  </PopEditorWrap>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import PopEditorMixin from '@/components/PopEditors/PopEditorMixin'
import PopEditorWrap from '@/components/PopEditors/PopEditorWrap.vue'

@Component({
  components: {
    PopEditorWrap
  }
})
export default class FilterButtonEditor extends PopEditorMixin {}
</script>
