<template functional>
  <div
    :class="[
      data.staticClass,
      $style.preview,
      $style[`preview--${props.type}`],
      props.plain && $style['preview--plain']
    ]"
    :style="data.staticStyle"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ButtonTypePreviewBlock extends Vue {
  @Prop({
    type: String,
    default: 'default'
  })
  public type!: string

  @Prop({
    type: Boolean,
    default: false
  })
  public plain!: boolean
}
</script>

<style lang="less" module>
.preview {
  display: inline-block;
  overflow: hidden;
  border: 1px solid #dcdfe6;
  border-radius: 2px;

  &::after {
    display: block;
    width: 15px;
    height: 10px;
    content: '';
    background-color: #fff;
    opacity: 0;
  }

  &--plain {
    &::after {
      opacity: 0.8;
    }
  }

  &--default {
    background-color: #fff;
    border-color: #dcdfe6;
  }
  &--primary {
    background-color: #409eff;
    border-color: #409eff;
  }
  &--success {
    background-color: #67c23a;
    border-color: #67c23a;
  }
  &--info {
    background-color: #909399;
    border-color: #909399;
  }
  &--warning {
    background-color: #e6a23c;
    border-color: #e6a23c;
  }
  &--danger {
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
}
</style>
