<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="model">
          <template slot="label">
            参数名称
            <el-tooltip
              :offset="10"
              class="tips"
              effect="dark"
              placement="top-start"
              content="接口提交时的参数名"
            >
              <i class="el-icon-warning" />
            </el-tooltip>
          </template>
          <el-input
            v-model.trim="fieldConfig.model"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="宽度"
          prop="width"
        >
          <el-input
            v-model.number="fieldConfig.width"
            :placeholder="widthPlaceholder"
            type="number"
            clearable
          >
            <template slot="append">px</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="label">
          <template slot="label">
            文字标签
            <el-tooltip
              :offset="10"
              class="tips"
              effect="dark"
              placement="top-start"
              content="使用在控件的 placeholder 以及控件上方的文字标签"
            >
              <i class="el-icon-warning" />
            </el-tooltip>
          </template>
          <el-input
            v-model.trim="fieldConfig.label"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="显示为禁用"
          prop="disabled"
        >
          <el-switch v-model="fieldConfig.disabled" />
        </el-form-item>
      </el-col>
    </el-row>
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
