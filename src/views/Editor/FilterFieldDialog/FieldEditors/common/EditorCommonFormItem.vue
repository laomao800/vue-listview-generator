<template>
  <div>
    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElFormItem prop="model">
          <template slot="label">
            参数名称
            <ElTooltip
              :offset="10"
              class="tips"
              effect="dark"
              placement="top-start"
              content="接口提交时的参数名"
            >
              <i class="el-icon-warning" />
            </ElTooltip>
          </template>
          <ElInput v-model.trim="fieldConfig.model" clearable />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="宽度" prop="width">
          <ElInput
            v-model.number="fieldConfig.width"
            :placeholder="widthPlaceholder"
            type="number"
            clearable
          >
            <template slot="append">
              px
            </template>
          </ElInput>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElFormItem prop="label">
          <template slot="label">
            文字标签
            <ElTooltip
              :offset="10"
              class="tips"
              effect="dark"
              placement="top-start"
              content="使用在控件的 placeholder 以及控件上方的文字标签"
            >
              <i class="el-icon-warning" />
            </ElTooltip>
          </template>
          <ElInput v-model.trim="fieldConfig.label" clearable />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="显示为禁用" prop="disabled">
          <ElSwitch v-model="fieldConfig.disabled" />
        </ElFormItem>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class EditorCommonFormItem extends Vue {
  // @Prop({ type: String, default: '100%' })
  // fieldType!: string
  @Prop({ type: Object, default: () => ({}) })
  fieldConfig!: object
  @Prop({ type: Number, default: null })
  widthPlaceholder!: object
}
</script>
