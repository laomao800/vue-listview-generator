<template>
  <ElForm
    ref="form"
    :model="fieldConfig"
    :rules="rules"
    size="small"
    label-width="120px"
  >
    <FieldPreview
      :field-type="fieldType"
      :field-config="fieldConfig"
    />

    <EditorCommonFormItem
      :field-type="fieldType"
      :field-config="fieldConfig"
      :width-placeholder="120"
    />

    <ElFormItem label="前置图标" prop="componentProps.prefixIcon">
      <IconSelector v-model="fieldConfig.componentProps.prefixIcon" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import fieldEditorMixin from './field-editor-mixin'

@Component
export default class EditorTimePicker extends mixins(fieldEditorMixin) {}
</script>
