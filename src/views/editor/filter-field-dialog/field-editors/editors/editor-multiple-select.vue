<template>
  <el-form
    ref="form"
    :model="fieldConfig"
    :rules="rules"
    size="small"
    label-width="120px"
  >
    <field-preview
      :field-type="fieldType"
      :field-config="fieldConfig"
    />

    <editor-common-form-item
      :field-type="fieldType"
      :field-config="fieldConfig"
      :width-placeholder="180"
    />

    <el-form-item label="选项数据">
      <options-edit-list :options.sync="fieldConfig.options" />
    </el-form-item>
  </el-form>
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
