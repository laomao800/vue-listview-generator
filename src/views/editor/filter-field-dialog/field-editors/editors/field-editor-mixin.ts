import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import IconSelector from '@/components/icon-selector/index.vue'
import FieldPreview from '../common/field-preview.vue'
import EditorCommonFormItem from '../common/editor-common-form-item.vue'
import editorRules from '../common/editor-rules'

/* eslint-disable */
@Component({
  components: {
    IconSelector,
    FieldPreview,
    EditorCommonFormItem
  }
})
/* eslint-enable */
export default class FieldEditorMixin extends Vue {
  @Prop({ type: String, default: '' })
  public fieldType!: string
  @Prop({ type: Object, default: () => ({}) })
  public fieldConfig!: object

  public rules = editorRules
}
