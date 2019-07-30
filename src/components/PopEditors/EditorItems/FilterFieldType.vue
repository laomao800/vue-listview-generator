<template>
  <EditorItemBase ref="field" icon="field-type" title="字段类型">
    <div style="font-size:12px;color:#999">{{ showValue }}</div>
    <div slot="pop" :class="$style.popper">
      <div
        v-for="item in fieldTypes"
        :key="item.type"
        :class="item.type === value && $style.selected"
        @click="handleChange(item.type)"
      >
        <SvgIcon :class="$style.icon" :name="item.icon" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </EditorItemBase>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'
import {
  filterFieldTypes,
  filterFieldTypesMap
} from '@/constants/filterFieldTypes'

@Component
export default class EditorItemFilterFieldType extends Vue {
  @Model('input', { type: String, default: 'text' })
  public value!: string

  public $refs: any
  public fieldTypes = filterFieldTypes
  public fieldTypesMap = filterFieldTypesMap

  get showValue() {
    return this.fieldTypesMap[this.value] && this.fieldTypesMap[this.value].name
  }

  handleChange(val: string) {
    this.$emit('input', val)
    this.$refs.field.hidePopover()
    // this.$refs.field.updatePopper()
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

.icon {
  margin-right: 8px;
  font-size: 16px;
}

.selected {
  font-weight: bold;
  color: @color-primary;
}
</style>
