<template>
  <ElDialog
    :title="title || '查看'"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :width="width ? width.toString() : 'fit-content'"
    @closed="handleClosed"
  >
    <AceEditor
      ref="aceEditor"
      :content="content"
      :height="height"
      :lang="lang"
      :readonly="readonly"
      :use-worker="useWorker"
      width="100%"
    />
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

@Component
export default class CodeDialog extends Vue {
  public $refs: any

  public visible: boolean = false
  public title: string = ''
  public content: string = ''
  public width: number = 800
  public height: number = 600
  public buttons: any[] = []
  public lang: string = 'javascript'
  public readonly: boolean = false
  public useWorker: boolean = true

  @Watch('visible')
  async visibleChanged(val: boolean) {
    if (val) {
      await this.$nextTick()
      this.$refs.aceEditor.editor.focus()
    }
  }

  handleButtonClick(button: any) {
    if (_.isFunction(button.click)) {
      const content = this.$refs.aceEditor.editor.getValue()
      button.click(content)
    }
  }

  handleClosed() {
    document.body.removeChild(this.$el)
    this.$destroy()
  }
}
</script>
