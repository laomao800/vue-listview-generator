<template>
  <ElForm
    ref="form"
    :model="fieldConfig"
    :rules="rules"
    size="small"
    label-width="120px"
  >
    <FieldPreview
      :key="previewForceUpdate"
      :field-type="fieldType"
      :field-config="fieldConfig"
    />

    <EditorCommonFormItem
      :field-type="fieldType"
      :field-config="fieldConfig"
      :width-placeholder="180"
    />

    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElFormItem label="前置图标" prop="componentProps.prefixIcon">
          <IconSelector v-model="fieldConfig.componentProps.prefixIcon" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="日期单位" prop="componentProps.type">
          <ElSelect
            v-model="fieldConfig.componentProps.type"
            clearable
            @clear="$delete(fieldConfig.componentProps, 'type')"
          >
            <ElOption :value="undefined" label="天" />
            <ElOption label="周" value="week" />
            <ElOption label="月" value="month" />
            <ElOption label="年" value="year" />
            <ElOption label="多个日期" value="dates" />
          </ElSelect>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElFormItem label="显示格式" prop="componentProps.format">
          <template slot="label">
            显示格式
            <ElTooltip
              :offset="10"
              class="tips"
              effect="dark"
              placement="top-start"
              content="用于格式化控件上显示的日期格式，不影响提交值。"
            >
              <i class="el-icon-warning" />
            </ElTooltip>
          </template>
          <ElInput
            v-model="fieldConfig.componentProps.format"
            placeholder="yyyy-MM-dd"
            clearable
          />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="提交格式" prop="componentProps.valueFormat">
          <template slot="label">
            提交格式
            <ElTooltip
              :offset="10"
              class="tips"
              effect="dark"
              placement="top-start"
              content="设置该项，字段会对应格式的字符串提交。不设置则字段会以 Date 类型提交。"
            >
              <i class="el-icon-warning" />
            </ElTooltip>
          </template>
          <ElInput v-model="fieldConfig.componentProps.valueFormat" clearable />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <DateFormatTips />
  </ElForm>
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
