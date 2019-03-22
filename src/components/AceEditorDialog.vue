<template>
  <ElDialog
    :title="title || '查看'"
    :visible.sync="editorVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="fit-content"
  >
    <AceEditor ref="aceEditor" v-bind="editorProps"/>
    <slot name="footer" slot="footer">
      <ElButton @click="hideDialog">取 消</ElButton>
      <ElButton type="primary" @click="emitContent">确 定</ElButton>
    </slot>
  </ElDialog>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

const EditorDialogModule = namespace('aceEditorDialog')

@Component
export default class AceEditorDialog extends Vue {
  @Prop({})
  public footer!: any

  @EditorDialogModule.State('visible')
  public visible!: boolean

  @EditorDialogModule.State('title')
  public title!: string

  @EditorDialogModule.State('editorProps')
  public editorProps!: any

  @EditorDialogModule.Action('hide')
  public hideDialog!: void

  public $refs: any
  public editorContent: any = ''

  get editorVisible() {
    return this.visible
  }

  set editorVisible(val) {
    !val && this.$store.dispatch('aceEditorDialog/hide')
  }

  @Watch('visible')
  async visibleChanged(val: boolean) {
    if (val) {
      await this.$nextTick()
      this.$refs.aceEditor.editor.focus()
    }
  }

  emitContent() {
    const editorContent = this.$refs.aceEditor.editor.getValue()
    this.$store.dispatch('aceEditorDialog/emit', editorContent)
  }
}
</script>
