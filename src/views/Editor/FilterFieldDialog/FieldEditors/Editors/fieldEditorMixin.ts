import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import IconSelector from '@/components/IconSelector/index.vue'
import FieldPreview from '../common/FieldPreview.vue'
import EditorCommonFormItem from '../common/EditorCommonFormItem.vue'
import editorRules from '../common/editorRules'

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
