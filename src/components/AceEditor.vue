<template>
  <div :style="{ height: editorHeight, width: editorWidth, fontSize: '14px' }"/>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ace from 'brace'
import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/mode/jsx'
import { parseSizeWithUnit } from '@/utils'

@Component
export default class AceEditor extends Vue {
  @Prop({ type: String, default: '' })
  public content!: string

  @Prop({ type: String, default: 'javascript' })
  public lang!: string

  @Prop({ type: Boolean, default: false })
  public readonly!: boolean

  @Prop({ type: [String, Number], default: 300 })
  public height!: number

  @Prop({ type: [String, Number], default: '100%' })
  public width!: string

  @Prop({ type: Object, default: () => ({}) })
  public options!: any

  @Prop({ type: Boolean, default: true })
  public useWorker!: boolean

  public editor: any = null

  get editorHeight() {
    return parseSizeWithUnit(this.height)
  }
  get editorWidth() {
    return parseSizeWithUnit(this.width)
  }

  @Watch('content')
  contentChanged(val: string) {
    this.editor.setValue(val, 1)
  }

  @Watch('lang')
  langChanged(val: string) {
    this.editor.getSession().setMode(`ace/mode/${val}`)
  }

  @Watch('readonly')
  readonlyChanged(val: boolean) {
    this.editor.setReadOnly(val)
  }

  @Watch('useWorker')
  useWorkerChanged(val: boolean) {
    this.editor.getSession().setUseWorker(val)
  }

  @Watch('editorHeight')
  @Watch('editorWidth')
  sizeChanged() {
    this.editor.resize()
  }

  getValue() {
    return this.editor.getValue()
  }

  mounted() {
    const themeName = 'tomorrow_night_bright'
    require(`brace/theme/${themeName}`)
    const editor = ace.edit(this.$el as HTMLElement)
    editor.$blockScrolling = Infinity
    editor.setReadOnly(this.readonly)
    editor.setTheme(`ace/theme/${themeName}`)
    editor.getSession().setUseWrapMode(true)
    editor.getSession().setUseWorker(this.useWorker)
    editor.setOptions({
      mode: `ace/mode/${this.lang}`,
      tabSize: 2,
      useSoftTabs: true,
      ...this.options
    })
    editor.setValue(this.content, 1)
    editor.on('change', () => {
      const content = editor.getValue()
      this.$emit('change', content)
      this.$emit('update:content', content)
    })
    this.editor = editor
  }
}
</script>
