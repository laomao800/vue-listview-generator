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
      :width-placeholder="180"
    />

    <ElFormItem label="选项数据">
      <OptionsEditList :options.sync="fieldConfig.options" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop, Watch } from 'vue-property-decorator'
import OptionsEditList from '@/views/components/options-edit-list.vue'
import fieldEditorMixin from './field-editor-mixin'

@Component({
  components: {
    OptionsEditList
  }
})
export default class EditorMultipleSelect extends mixins(fieldEditorMixin) {}
</script>
