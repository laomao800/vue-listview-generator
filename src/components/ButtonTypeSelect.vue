<template>
  <ElSelect v-model="internalType" @change="handleChange">
    <ButtonTypePreviewBlock
      slot="prefix"
      :type="value"
      :plain="plain"
      style="margin-left:4px;margin-top:10px;"
    />
    <ElOption v-for="(type, index) in buttonTypes" :key="index" :label="type" :value="type">
      <ButtonTypePreviewBlock
        :type="type"
        :plain="plain"
        style="margin-right:8px;vertical-align:middle;"
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
  @Model('input', {
    type: String,
    default: 'default'
  })
  public value!: buttonTypes

  @Prop({
    type: Boolean,
    default: false
  })
  public plain!: boolean

  public internalType = this.value
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
  }
}
</script>
