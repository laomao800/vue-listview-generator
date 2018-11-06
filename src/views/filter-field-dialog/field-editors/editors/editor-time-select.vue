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
      :width-placeholder="120"
    />

    <el-form-item label="前置图标" prop="componentProps.prefixIcon">
      <icon-selector v-model="fieldConfig.componentProps.prefixIcon" />
    </el-form-item>

    <el-row>
      <el-col :span="8">
        <el-form-item
          :rules="{
            validator(rule, value, callback) {
              pickerOptionsValidator(inputStart, callback)
            }
          }"
          label="开始时间"
          prop="componentProps.pickerOptions.start"
        >
          <el-input
            v-model="inputStart"
            placeholder="09:00"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="{
            validator(rule, value, callback) {
              pickerOptionsValidator(inputEnd, callback)
            }
          }"
          label="结束时间"
          prop="componentProps.pickerOptions.end"
        >
          <el-input
            v-model="inputEnd"
            placeholder="18:00"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="{
            validator(rule, value, callback) {
              pickerOptionsValidator(inputStep, callback)
            }
          }"
          label="选项跨度"
          prop="componentProps.pickerOptions.step"
        >
          <el-input
            v-model="inputStep"
            placeholder="00:30"
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop, Watch } from 'vue-property-decorator'
import fieldEditorMixin from './field-editor-mixin'

function isValidTimeFormat(value: string) {
  const reg = /^[0-5][0-9](:[0-5][0-9])+$/
  return reg.test(value)
}

@Component
export default class EditorTimeSelect extends mixins(fieldEditorMixin) {
  public previewForceUpdate: string = ''
  public inputStart: string = ''
  public inputEnd: string = ''
  public inputStep: string = ''

  public fieldConfig: any

  @Watch('inputStart')
  onStartChanged(newValue: string) {
    this.setPickerOptions(newValue, 'start')
  }
  @Watch('inputEnd')
  onEndChanged(newValue: string) {
    this.setPickerOptions(newValue, 'end')
  }
  @Watch('inputStep')
  onStepChanged(newValue: string) {
    this.setPickerOptions(newValue, 'step')
  }

  created() {
    this.$set(this.fieldConfig.componentProps, 'pickerOptions', {})
  }

  pickerOptionsValidator(value: any, callback: (e?: any) => void) {
    if (!value || isValidTimeFormat(value)) {
      callback()
    } else {
      callback(new Error('仅支持 00:00 (时:分) 的格式'))
    }
  }

  setPickerOptions(newValue: string, prop: string) {
    const pickerOptions = this.fieldConfig.componentProps.pickerOptions
    if (isValidTimeFormat(newValue)) {
      this.$set(pickerOptions, prop, newValue)
    } else {
      // 无效格式时刷新预览，并删除原始旧值
      const oldValue = pickerOptions[prop]
      if (oldValue) {
        this.$delete(pickerOptions, prop)
        this.previewForceUpdate = (+new Date()).toString()
      }
    }
  }
}
</script>
