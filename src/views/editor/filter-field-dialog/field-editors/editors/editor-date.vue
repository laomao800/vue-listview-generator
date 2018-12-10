<template>
  <el-form
    ref="form"
    :model="fieldConfig"
    :rules="rules"
    size="small"
    label-width="120px"
  >
    <field-preview
      :key="previewForceUpdate"
      :field-type="fieldType"
      :field-config="fieldConfig"
    />

    <editor-common-form-item
      :field-type="fieldType"
      :field-config="fieldConfig"
      :width-placeholder="180"
    />

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="前置图标" prop="componentProps.prefixIcon">
          <icon-selector v-model="fieldConfig.componentProps.prefixIcon" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="日期单位" prop="componentProps.type">
          <el-select
            v-model="fieldConfig.componentProps.type"
            clearable
            @clear="$delete(fieldConfig.componentProps, 'type')"
          >
            <el-option :value="undefined" label="天" />
            <el-option label="周" value="week" />
            <el-option label="月" value="month" />
            <el-option label="年" value="year" />
            <el-option label="多个日期" value="dates" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="显示格式" prop="componentProps.format">
          <template slot="label">
            显示格式
            <el-tooltip
              :offset="10"
              class="tips"
              effect="dark"
              placement="top-start"
              content="用于格式化控件上显示的日期格式，不影响提交值。"
            >
              <i class="el-icon-warning" />
            </el-tooltip>
          </template>
          <el-input
            v-model="fieldConfig.componentProps.format"
            placeholder="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="提交格式" prop="componentProps.valueFormat">
          <template slot="label">
            提交格式
            <el-tooltip
              :offset="10"
              class="tips"
              effect="dark"
              placement="top-start"
              content="设置该项，字段会对应格式的字符串提交。不设置则字段会以 Date 类型提交。"
            >
              <i class="el-icon-warning" />
            </el-tooltip>
          </template>
          <el-input v-model="fieldConfig.componentProps.valueFormat" clearable />
        </el-form-item>
      </el-col>
    </el-row>

    <date-format-tips />
  </el-form>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import fieldEditorMixin from './field-editor-mixin'
import DateFormatTips from '../common/date-format-tips.vue'

@Component({
  components: {
    DateFormatTips
  }
})
export default class EditorDate extends mixins(fieldEditorMixin) {
  public fieldConfig: any

  get previewForceUpdate() {
    return this.fieldConfig.componentProps.type
  }
}
</script>
