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

    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElFormItem label="前置图标" prop="prefixIcon">
          <IconSelector v-model="fieldConfig.componentProps.prefixIcon" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="后置图标" prop="suffixIcon">
          <IconSelector v-model="fieldConfig.componentProps.suffixIcon" />
        </ElFormItem>
      </ElCol>
    </ElRow>
  </ElForm>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import fieldEditorMixin from './fieldEditorMixin'

@Component
export default class EditorText extends mixins(fieldEditorMixin) {}
</script>
