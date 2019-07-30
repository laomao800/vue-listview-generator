import _ from 'lodash'
import { Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import { debounce } from 'decko'

@Component
class PopEditorMixin extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  public data!: any

  public $refs: any
  public visible: boolean = false
  public editingData: any = {}

  @Watch('data', { immediate: true })
  dataChanged(newVal: any) {
    if (!_.isEqual(newVal, this.editingData)) {
      this.editingData = _.cloneDeep(newVal)
    }
  }

  @Watch('editingData', { deep: true })
  editingDataChanged(newVal: any) {
    if (!_.isEqual(newVal, this.data)) {
      this.syncData()
    }
  }

  @Watch('visible')
  visibleChanged(newVal: boolean) {
    if (newVal) {
      this.autoFocusInput()
    }
  }

  async autoFocusInput() {
    await this.$nextTick()
    const focusInput = this.$refs.focusInput
    if (focusInput) {
      this.$refs.focusInput.focus()
      this.$refs.focusInput.$refs.input.select()
    }
  }

  show() {
    this.visible = true
  }

  @debounce
  syncData() {
    this.$emit('change', _.cloneDeep(this.editingData))
  }

  emitCopy() {
    this.$emit('copy', _.cloneDeep(this.editingData))
    this.visible = false
  }

  emitDelete() {
    this.$emit('delete')
  }
}

export default Mixins(PopEditorMixin)
