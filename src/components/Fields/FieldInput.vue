<template>
  <div class="editor-field-input" :class="{'editor-field-input--inline': !block}">
    <div class="editor-field-input__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="editor-field-input__content" :style="{ maxWidth: inputMaxWidth }">
      <ElInput ref="input" v-model="internalValue" v-bind="$attrs" size="mini">
        <slot slot="prefix" name="prefix"/>
        <slot slot="suffix" name="suffix"/>
        <slot slot="prepend" name="prepend"/>
        <slot slot="append" name="append"/>
      </ElInput>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'
import { parseSizeWithUnit } from '@/utils'

@Component({
  inheritAttrs: false
})
export default class FieldInput extends Vue {
  @Model('input', { type: String, default: '' }) public value!: string
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Boolean, default: false }) block!: boolean
  @Prop({ type: [Number, String] }) inputWidth!: number | string

  public $refs: any

  get internalValue() {
    return this.value
  }

  set internalValue(val: any) {
    this.$emit('input', val)
  }

  get inputMaxWidth() {
    return parseSizeWithUnit(this.inputWidth)
  }

  focus() {
    this.$refs.input.focus()
  }
}
</script>

<style lang="less" scoped>
.editor-field-input {
  display: block;
  min-height: 28px;
  padding: 0 8px;
  margin-bottom: 6px;
  line-height: 120%;

  &__title {
    font-size: 12px;
    font-weight: 500;
    color: #888;
    white-space: nowrap;
  }

  &__content {
    padding: 2px 0;

    > * {
      vertical-align: top;
    }
  }

  &--inline {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  &--inline &__title {
    max-width: 50%;
    padding: 0 10px 0 0;
  }

  &--inline &__content {
    width: 60%;
    margin-left: auto;
  }

  &--inline + & {
    margin-top: 6px;
  }
}
</style>

<style lang="less">
.editor-field-input {
  .el-input__inner {
    padding: 0 10px;
  }
  .el-input-group__append {
    padding: 0 10px;
  }
}
</style>
