<template>
  <ElForm
    ref="form"
    :model="fieldConfig"
    :rules="rules"
    size="small"
    label-width="120px"
  >
    <FieldPreview :field-type="fieldType" :field-config="fieldConfig" />

    <EditorCommonFormItem
      :field-type="fieldType"
      :field-config="fieldConfig"
      :width-placeholder="180"
    />
  </ElForm>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import fieldEditorMixin from './fieldEditorMixin'

@Component
export default class EditorCascader extends mixins(fieldEditorMixin) {
  @Prop({ type: Array, default: () => [] })
  public options!: object[]
}
</script>
