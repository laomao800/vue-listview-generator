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
      <!-- <el-radio-group v-model="optionsEditForm.dataType">
        <el-radio-button label="static">静态选项</el-radio-button>
        <el-radio-button label="datasource" disabled="disabled">外部数据源</el-radio-button>
      </el-radio-group> -->
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
export default class EditorSelect extends mixins(fieldEditorMixin) {
  @Watch('optionsEditForm.data')
  onDataChanged(value: string) {
    this.$set(this.fieldConfig, 'options', value) // .filter(option => option.label)
  }
}
</script>
