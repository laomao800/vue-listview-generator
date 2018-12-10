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
      :width-placeholder="200"
    />

    <el-form-item label="前置图标" prop="componentProps.prefixIcon">
      <icon-selector v-model="fieldConfig.componentProps.prefixIcon" />
    </el-form-item>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="开始占位符" prop="componentProps.startPlaceholder">
          <el-input
            v-model="fieldConfig.componentProps.startPlaceholder"
            placeholder="开始时间"
            clearable
            @clear="$delete(fieldConfig.componentProps, 'startPlaceholder')"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结束占位符" prop="componentProps.endPlaceholder">
          <el-input
            v-model="fieldConfig.componentProps.endPlaceholder"
            placeholder="结束时间"
            clearable
            @clear="$delete(fieldConfig.componentProps, 'endPlaceholder')"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import fieldEditorMixin from './field-editor-mixin'

@Component
export default class EditorTimePickerRange extends mixins(fieldEditorMixin) {}
</script>
