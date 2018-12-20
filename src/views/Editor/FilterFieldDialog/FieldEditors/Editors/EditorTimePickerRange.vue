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
      :width-placeholder="200"
    />

    <ElFormItem
      label="前置图标"
      prop="componentProps.prefixIcon"
    >
      <IconSelector v-model="fieldConfig.componentProps.prefixIcon" />
    </ElFormItem>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElFormItem
          label="开始占位符"
          prop="componentProps.startPlaceholder"
        >
          <ElInput
            v-model="fieldConfig.componentProps.startPlaceholder"
            placeholder="开始时间"
            clearable
            @clear="$delete(fieldConfig.componentProps, 'startPlaceholder')"
          />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem
          label="结束占位符"
          prop="componentProps.endPlaceholder"
        >
          <ElInput
            v-model="fieldConfig.componentProps.endPlaceholder"
            placeholder="结束时间"
            clearable
            @clear="$delete(fieldConfig.componentProps, 'endPlaceholder')"
          />
        </ElFormItem>
      </ElCol>
    </ElRow>
  </ElForm>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import fieldEditorMixin from './fieldEditorMixin'

@Component
export default class EditorTimePickerRange extends mixins(fieldEditorMixin) {}
</script>
