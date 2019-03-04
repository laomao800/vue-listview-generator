<template>
  <div :class="$style.wrap">
    <div :class="$style.icon">
      <ElTooltip :content="typeName" :enterable="false">
        <SvgIcon :name="typeIcon"/>
      </ElTooltip>
    </div>
    <ElTag v-if="label" :class="$style.label">{{ label }}</ElTag>
    <ElTag v-if="model" :class="$style.model" type="warning">{{ model }}</ElTag>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FilterField } from '@laomao800/vue-listview'

const fieldTypes = [
  { name: '文本标签', icon: 'string', type: 'label' },
  { name: '文本框', icon: 'text', type: 'text' },
  { name: '数字', icon: 'number', type: 'number' },
  { name: '单选选项', icon: 'select', type: 'select' },
  { name: '多选选项', icon: 'select', type: 'multipleSelect' },
  { name: '级联选项', icon: 'select', type: 'cascader' },
  { name: '日期选择', icon: 'date', type: 'date' },
  { name: '日期范围', icon: 'date', type: 'dateRange' },
  { name: '日期时间', icon: 'date', type: 'dateTime' },
  { name: '日期时间范围', icon: 'date', type: 'dateTimeRange' },
  { name: '固定时间', icon: 'time', type: 'timeSelect' },
  { name: '任意时间', icon: 'time', type: 'timePicker' },
  { name: '任意时间范围', icon: 'time', type: 'timePickerRange' }
]

const fieldMap = _.keyBy(fieldTypes, 'type')

@Component({
  inheritAttrs: false
})
export default class FilterFieldPreview extends Vue {
  @Prop({ type: String, default: '' })
  public type!: FilterField['type']

  @Prop({ type: String, default: '' })
  public label!: FilterField['label']

  @Prop({ type: String, default: '' })
  public model!: FilterField['model']

  get typeIcon() {
    return fieldMap[this.type as string].icon
  }

  get typeName() {
    return fieldMap[this.type as string].name
  }
}
</script>

<style lang="less" module>
.wrap {
  min-height: 28px;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 20px;
  color: #666;

  > div {
    vertical-align: middle;
  }
}

.icon,
.label,
.model {
  margin-right: 10px;
}

.icon {
  display: inline-block;
  font-size: 18px;
}

.label,
.model {
  height: auto;
  padding: 4px 8px;
  line-height: 1;
}
</style>
