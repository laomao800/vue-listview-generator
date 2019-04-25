<template>
  <FieldItemBasic ref="field" title="按钮样式">
    <ButtonTypePreviewBlock :type="value" :plain="plain" style="margin-top:2px"/>
    <div slot="pop" :class="$style.popper">
      <div
        v-for="type in buttonTypes"
        :key="type"
        :class="type === value && $style.selected"
        @click="handleChange(type)"
      >
        <ButtonTypePreviewBlock
          :type="type"
          :plain="plain"
          style="margin-right:8px;vertical-align:middle;"
        />
        <span>{{ type }}</span>
      </div>
    </div>
  </FieldItemBasic>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'

type buttonTypes =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'

@Component
export default class FieldButtonType extends Vue {
  @Model('input', { type: String, default: 'default' })
  public value!: buttonTypes

  @Prop({ type: Boolean, default: false })
  public plain!: boolean

  public $refs: any
  public buttonTypes: buttonTypes[] = [
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger'
  ]

  handleChange(val: buttonTypes) {
    this.$emit('input', val)
    // this.$refs.field.hidePopover()
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
