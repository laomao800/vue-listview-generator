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
      :width-placeholder="240"
    />

    <ElFormItem
      label="前置图标"
      prop="prefixIcon"
    >
      <IconSelector v-model="fieldConfig.componentProps.prefixIcon" />
    </ElFormItem>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElFormItem
          label="开始占位符"
          prop="componentProps.startPlaceholder"
        >
          <!-- TODO: 清除后无法同步数据至 preview 中 -->
          <ElInput
            v-model="fieldConfig.componentProps.startPlaceholder"
            placeholder="开始日期"
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
            placeholder="结束日期"
            clearable
            @clear="$delete(fieldConfig.componentProps, 'endPlaceholder')"
          />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElFormItem
          label="显示格式"
          prop="format"
        >
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
        <ElFormItem
          label="提交格式"
          prop="format"
        >
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
          <ElInput
            v-model="fieldConfig.componentProps.valueFormat"
            clearable
          />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <DateFormatTips />
  </ElForm>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import fieldEditorMixin from './fieldEditorMixin'
import DateFormatTips from '../common/DateFormatTips.vue'

@Component({
  components: {
    DateFormatTips
  }
})
export default class EditorDateRange extends mixins(fieldEditorMixin) {}
</script>
