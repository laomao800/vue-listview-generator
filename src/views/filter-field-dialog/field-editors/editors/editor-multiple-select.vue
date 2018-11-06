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
      <el-button
        type="primary"
        plain
        @click="showOptionsEditForm"
      >
        配置静态选项
      </el-button>
    </el-form-item>

    <options-edit-list :options="optionsEditForm.data" />
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
export default class EditorMultipleSelect extends mixins(fieldEditorMixin) {
  public optionsEditForm = {
    visible: false,
    data: []
  }

  @Watch('optionsEditForm.data')
  onDataChanged(value: string) {
    this.$set(this.fieldConfig, 'options', value) // .filter(option => option.label)
  }

  showOptionsEditForm() {
    this.optionsEditForm.visible = true
  }
}
</script>
