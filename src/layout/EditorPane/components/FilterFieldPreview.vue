<template>
  <div :class="$style.wrap">
    <div :class="$style.icon">
      <ElTooltip :content="iconTips" :enterable="false" placement="top">
        <SvgIcon :name="iconName"/>
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
import { filterFieldTypesMap } from '@/constants/filterFieldTypes'

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

  get iconName() {
    return filterFieldTypesMap[this.type as string].icon
  }

  get iconTips() {
    return filterFieldTypesMap[this.type as string].name
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
