<template>
  <div class="editor-container" :style="editorStyle"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { parseSizeWithUnit } from '@/utils'

@Component
export default class MonacoEditor extends Vue {
  @Prop({ type: [String, Number], default: 300 })
  public height!: number

  @Prop({ type: [String, Number], default: '100%' })
  public width!: string

  @Prop({ type: String, default: '' })
  public content!: string

  @Prop({ type: String, default: 'javascript' })
  public lang!: string

  @Prop({ type: String, default: 'vs-dark' })
  public theme!: string

  @Prop({ type: Boolean, default: false })
  public readonly!: boolean

  @Prop({ type: Object, default: () => ({}) })
  public options!: any

  public editor: any = null

  get editorStyle() {
    return {
      height: parseSizeWithUnit(this.height),
      width: parseSizeWithUnit(this.width)
    }
  }

  @Watch('content')
  contentChanged() {
    this.editor.setValue(this.content)
  }

  @Watch('lang')
  langChanged() {
    monaco.editor.setModelLanguage(this.editor.getModel(), this.lang)
  }

  @Watch('theme')
  themeChanged() {
    monaco.editor.setTheme(this.theme)
  }

  @Watch('readonly')
  readonlyChanged(val: boolean) {
    this.editor.updateOptions({ readOnly: this.readonly })
  }

  @Watch('editorStyle')
  sizeChanged() {
    this.editor.layout()
  }

  getValue() {
    return this.editor.getValue()
  }

  mounted() {
    const editor = monaco.editor.create(this.$el as HTMLElement, {
      value: this.content,
      language: this.lang,
      theme: this.theme,
      readOnly: this.readonly,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      ...this.options
    })
    editor.onDidChangeModelContent(event => {
      const content = editor.getValue()
      this.$emit('change', content)
      this.$emit('update:content', content)
    })
    this.editor = editor
  }
}
</script>
