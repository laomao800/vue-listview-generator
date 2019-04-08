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
      <ElButton
        v-for="(button, index) in buttons"
        :key="index"
        :type="button.type"
        @click="handleButtonClick(button)"
      >{{ button.text }}</ElButton>
    </slot>
  </ElDialog>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

const EditorDialogModule = namespace('codeDialog')

@Component
export default class CodeDialog extends Vue {
  @Prop({})
  public footer!: any

  @EditorDialogModule.State('visible')
  public visible!: boolean

  @EditorDialogModule.State('title')
  public title!: string

  @EditorDialogModule.State('buttons')
  public buttons!: object[]

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
    !val && this.$store.dispatch('codeDialog/hide')
  }

  @Watch('visible')
  async visibleChanged(val: boolean) {
    if (val) {
      await this.$nextTick()
      this.$refs.aceEditor.editor.focus()
    }
  }

  handleButtonClick(button) {
    if (_.isFunction(button.click)) {
      const content = this.$refs.aceEditor.editor.getValue()
      button.click(content)
    }
  }
}
</script>
