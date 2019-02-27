<template>
  <ElSelect v-model="internalType" @change="handleChange">
    <span
      slot="prefix"
      :class="[
        'button-color-preview',
        {
          [`button-color-preview--${type}`]: type,
          'button-color-preview--plain': plain
        }
      ]"
      style="margin-left: 4px;margin-top: 10px;"
    />
    <ElOption v-for="(type, index) in buttonTypes" :key="index" :label="type" :value="type">
      <span
        :class="[
          'button-color-preview',
          {
            [`button-color-preview--${type}`]: type,
            'button-color-preview--plain': plain
          }
        ]"
      />
      <span>{{ type }}</span>
    </ElOption>
  </ElSelect>
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
export default class ButtonTypeSelect extends Vue {
  @Model('change', {
    type: String,
    default: 'default'
  })
  public type!: buttonTypes

  @Prop({
    type: Boolean,
    default: false
  })
  public plain!: boolean

  public internalType = this.type
  public buttonTypes: buttonTypes[] = [
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger'
  ]

  handleChange(val: buttonTypes) {
    this.$emit('change', val)
  }
}
</script>

<style lang="less" scoped>
.button-color-preview {
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
  border: 1px solid;

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
