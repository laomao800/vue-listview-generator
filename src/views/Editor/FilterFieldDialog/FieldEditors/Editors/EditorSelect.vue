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
      <!-- <el-radio-group v-model="optionsEditForm.dataType">
        <el-radio-button label="static">静态选项</el-radio-button>
        <el-radio-button label="datasource" disabled="disabled">外部数据源</el-radio-button>
      </el-radio-group> -->
      <OptionsEditList :options.sync="fieldConfig.options" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop, Watch } from 'vue-property-decorator'
import OptionsEditList from '@/views/components/OptionsEditList.vue'
import fieldEditorMixin from './fieldEditorMixin'

@Component({
  components: {
    OptionsEditList
  }
})
export default class EditorSelect extends mixins(fieldEditorMixin) {}
</script>
