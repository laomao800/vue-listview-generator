<template>
  <EditorItemBase ref="field" title="日期单位">
    <div style="font-size:12px;color:#999">{{ showValue }}</div>
    <div slot="pop" :class="$style.popper">
      <div
        v-for="(item, index) in listData"
        :key="index"
        :class="item.value === value && $style.selected"
        @click="handleChange(item.value)"
      >{{ item.label }}</div>
    </div>
  </EditorItemBase>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Model } from 'vue-property-decorator'

// TODO: 与 FieldIcons FieldButtonType 整合

const listData = [
  { label: '天（默认）', value: 'date' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
  { label: '年', value: 'year' },
  { label: '多个日期', value: 'dates' }
]
const listDataMap = _.keyBy(listData, 'value')

@Component
export default class EditorItemDateType extends Vue {
  @Model('input', { type: String, default: 'default' })
  public value!: string

  public $refs: any
  public listData = listData
  public listDataMap = listDataMap

  get showValue() {
    return this.listDataMap[this.value] && this.listDataMap[this.value].label
  }

  handleChange(val: any) {
    this.$emit('input', val)
    this.$refs.field.hidePopover()
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.popper {
  padding: 6px 0;
  margin: -12px;

  > div {
    height: 34px;
    padding: 0 20px;
    line-height: 34px;
    cursor: pointer;

    &:hover {
      background-color: #f5f7fa;
    }
  }
}

.selected {
  font-weight: bold;
  color: @color-primary;
}
</style>
