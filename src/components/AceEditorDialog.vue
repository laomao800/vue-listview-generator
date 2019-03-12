<template>
  <ElDialog :title="title || '编辑'" :visible="visible" width="640px">
    <AceEditor ref="aceEditor" :content="editorContent" :height="editorHeight" :lang="lang"/>
    <div slot="footer">
      <ElButton @click="hideDialog">取 消</ElButton>
      <ElButton type="primary" @click="emitData">确 定</ElButton>
    </div>
  </ElDialog>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

const EditorDialogModule = namespace('editorDialog')

@Component
export default class AceEditorDialog extends Vue {
  @EditorDialogModule.State('visible')
  public visible!: boolean

  @EditorDialogModule.State('title')
  public title!: any

  @EditorDialogModule.State('lang')
  public lang!: any

  @EditorDialogModule.State('data')
  public data!: any

  @EditorDialogModule.Action('hide')
  public hideDialog!: void

  @Prop({ type: [String, Number], default: 300 })
  public editorHeight!: number

  public $refs: any
  public editorContent: any = ''

  @Watch('visible')
  async visibleChanged(val: boolean) {
    if (val) {
      this.updateContent()
      await this.$nextTick()
      this.$refs.aceEditor.editor.focus()
    } else {
      // 等待关闭动画播放后再重置数据
      setTimeout(() => {
        this.editorContent = ''
      }, 200)
    }
  }

  @Watch('data')
  dataChanged() {
    if (this.visible) {
      this.updateContent()
    }
  }

  updateContent() {
    this.editorContent = this.data
  }

  emitData() {
    const editorContent = this.$refs.aceEditor.editor.getValue()
    this.$store.dispatch('editorDialog/emit', editorContent)
  }
}
</script>
