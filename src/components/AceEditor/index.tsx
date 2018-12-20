import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ace from 'brace'
import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/mode/jsx'
import 'brace/theme/monokai'
import { parseSizeWithUnit } from '@laomao800/vue-listview/src/utils/utils'

@Component
export default class AceEditor extends Vue {
  @Prop({ type: String, default: '' })
  public content!: string
  @Prop({ type: String, default: 'javascript' })
  public lang!: string
  @Prop({ type: Boolean, default: false })
  public readonly!: boolean
  @Prop({ type: String, default: '300px' })
  public height!: string
  @Prop({ type: String, default: '100%' })
  public width!: string
  @Prop({ type: Object, default: () => ({}) })
  public options!: object

  public editor: any = null

  get editorHeight() {
    return parseSizeWithUnit(this.height)
  }
  get editorWidth() {
    return parseSizeWithUnit(this.width)
  }

  @Watch('content')
  onContentChanged(val: string) {
    this.editor.setValue(val, 1)
  }
  @Watch('lang')
  onLangChanged(val: string) {
    this.editor.getSession().setMode(`ace/mode/${val}`)
  }
  @Watch('readonly')
  onReadonlyChanged(val: boolean) {
    this.editor.setReadOnly(val)
  }

  getValue() {
    return this.editor.getValue()
  }

  mounted() {
    const editor = ace.edit(this.$el as HTMLElement)
    editor.$blockScrolling = Infinity
    editor.setReadOnly(this.readonly)
    editor.setTheme('ace/theme/monokai')
    editor.getSession().setUseWrapMode(true)
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

  render() {
    return (
      <div
        style={{
          height: this.editorHeight,
          width: this.editorWidth
        }}
      />
    )
  }
}
