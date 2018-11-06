<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="添加搜索字段"
    width="1000px"
  >
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="formSubmit">确 定</el-button>
    </div>

    <div class="field-editor">
      <div class="field__types">
        <div
          v-for="field in fieldTypes"
          :key="field.type"
          :label="field.name"
          :value="field.type"
          :class="[
            'field__type',
            { 'field__type--active': field.type === fieldType }
          ]"
          @click="fieldType = field.type"
        >
          {{ field.name }}
        </div>
      </div>

      <div class="field__content">
        <keep-alive>
          <component
            :is="fieldEditor"
            ref="fieldEditor"
            :field-type="fieldType"
            :field-config="fieldConfig"
          />
        </keep-alive>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import FieldEditors from './field-editors'

const fieldTypes = [
  { name: '文本框', type: 'text' },
  { name: '单选选项', type: 'select' },
  { name: '多选选项', type: 'multipleSelect' },
  // { name: '级联选项', type: 'cascader' },
  { name: '日期选择', type: 'date' },
  { name: '日期范围', type: 'dateRange' },
  { name: '日期时间', type: 'dateTime' },
  { name: '日期时间范围', type: 'dateTimeRange' },
  { name: '固定时间', type: 'timeSelect' },
  { name: '任意时间', type: 'timePicker' },
  { name: '任意时间范围', type: 'timePickerRange' }
]

interface AllFieldConfig {
  [k: string]: {
    [x: string]: any
    type: string
    label: string
    componentProps: object
  }
}

/**
 * 生成所有字段编辑器映射关系
 * editor-date-range.vue
 * { dateRange: 'EditorDateRange' }
 */
const fieldKeys = Object.keys(FieldEditors)
const shortKeys = fieldKeys.map(key => _.camelCase(key.replace(/^Editor/, '')))
const editorMaps = _.zipObject(shortKeys, fieldKeys)

const allFieldConfig: AllFieldConfig = _.zipObject(
  fieldTypes.map(item => item.type),
  fieldTypes.map(item => ({
    type: item.type,
    label: item.name,
    componentProps: {}
  }))
)

@Component({
  components: FieldEditors
})
export default class FilterFieldDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  public visible!: boolean
  @Prop({ type: Object, default: null })
  public editModel!: any

  public fieldTypes = fieldTypes
  public allFieldConfig: AllFieldConfig = {}
  public fieldType = ''
  public $refs: any

  get fieldEditor() {
    return editorMaps[_.camelCase(this.fieldType)]
  }

  get fieldConfig() {
    return this.allFieldConfig[_.camelCase(this.fieldType)]
  }

  get dialogVisible() {
    return this.visible
  }
  set dialogVisible(val) {
    if (val === false) {
      this.hideDialog()
    }
  }

  @Watch('dialogVisible')
  onVisibleChanged(val: boolean) {
    if (val && this.editModel) {
      const { type } = this.editModel
      const model = this.allFieldConfig[type]
      if (model) {
        this.fieldType = type
        this.allFieldConfig[type] = {
          ...model,
          ...this.editModel
        }
      }
    }
  }

  mounted() {
    this.init()
  }

  hideDialog() {
    this.$emit('update:visible', false)
    // 避免界面跳动，关闭动画播放完毕后再重置内容
    setTimeout(() => {
      this.init()
    }, 500)
  }

  formSubmit() {
    this.$refs.fieldEditor.$refs.form.validate((valid: boolean) => {
      if (valid) {
        const fieldConfig = _.cloneDeep(this.allFieldConfig[this.fieldType])
        Object.keys(fieldConfig).forEach(key => {
          if (_.isEmpty(fieldConfig[key])) {
            delete fieldConfig[key]
          }
        })
        this.$emit('submit', {
          key: +new Date(),
          type: 'object',
          data: fieldConfig
        })
        this.hideDialog()
      }
    })
  }

  init() {
    // const $editor = this.$refs['fieldEditor']
    // const $form = $editor.$refs['form']
    // $form && $form.resetFields()
    this.allFieldConfig = _.cloneDeep(allFieldConfig)
    this.fieldType = 'text'
  }

  reset() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.field-editor {
  display: flex;
}
.field__types {
  width: 120px;
  margin-right: 20px;
  border-right: 3px solid #e2e6ec;
}
.field__type {
  padding-right: 20px;
  font-size: 12px;
  line-height: 32px;
  text-align: right;
  cursor: pointer;

  &:hover {
    color: #009efb;
  }

  &--active {
    margin-right: -3px;
    border-right: 3px solid #009efb;
  }
}
.field__content {
  flex: 1;
  overflow: hidden;
}
</style>
