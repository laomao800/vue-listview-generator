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

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="前置图标" prop="prefixIcon">
          <icon-selector v-model="fieldConfig.componentProps.prefixIcon" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="后置图标" prop="suffixIcon">
          <icon-selector v-model="fieldConfig.componentProps.suffixIcon" />
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
export default class EditorText extends mixins(fieldEditorMixin) {}
</script>
