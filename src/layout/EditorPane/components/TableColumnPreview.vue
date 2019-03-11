<template>
  <div :class="$style.wrap">
    <div :class="$style.icon">
      <SvgIcon :name="iconName"/>
    </div>
    <ElTag v-if="label" :class="$style.label">{{ label }}</ElTag>
    <ElTag v-if="prop" :class="$style.prop" type="warning">{{ prop }}</ElTag>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TableColumn } from '@laomao800/vue-listview'

@Component({
  inheritAttrs: false
})
export default class TableColumnPreview extends Vue {
  @Prop({ type: String, default: '' })
  public label!: TableColumn['label']

  @Prop({ type: String, default: '' })
  public prop!: TableColumn['prop']

  @Prop({ type: Function, default: null })
  public formatter!: TableColumn['formatter']

  @Prop({ type: Function, default: null })
  public render!: TableColumn['render']

  get iconName() {
    if (this.render) {
      return 'code'
    } else if (this.formatter) {
      return 'terminal'
    } else {
      return 'column'
    }
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
