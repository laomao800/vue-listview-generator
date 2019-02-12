<template>
  <ElDialog :visible.sync="dialogVisible" :close-on-click-modal="false" title="添加表格列" width="400px">
    <div slot="footer" class="dialog-footer">
      <ElButton @click="hideDialog">取 消</ElButton>
      <ElButton type="primary" @click="formSubmit">确 定</ElButton>
    </div>

    <ElForm ref="form" :model="model" size="small" label-width="120px">
      <ElFormItem label="表头文本" prop="label">
        <ElInput v-model="model.label"/>
      </ElFormItem>
      <ElFormItem label="列内容属性名" prop="prop">
        <ElInput v-model="model.prop"/>
      </ElFormItem>
      <ElFormItem label="对齐" prop="align">
        <el-radio-group v-model="model.align">
          <el-radio-button label="left"></el-radio-button>
          <el-radio-button label="center"></el-radio-button>
          <el-radio-button label="right"></el-radio-button>
        </el-radio-group>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class TableColumnDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  public visible!: boolean
  @Prop({ type: Object, default: null })
  public editModel!: object
  public $refs: any

  public model = {
    label: '表头文字',
    prop: 'prop',
    align: 'left'
  }

  get dialogVisible() {
    return this.visible
  }
  set dialogVisible(val) {
    if (val === false) {
      this.hideDialog()
    }
  }

  @Watch('dialogVisible')
  onVisibleChanged(val: boolean) {
    if (val && this.editModel) {
      this.model = {
        ...this.model,
        ...this.editModel
      }
    }
  }

  hideDialog() {
    this.$emit('update:visible', false)
    // 避免界面跳动，关闭动画播放完毕后再重置内容
    setTimeout(() => {
      this.reset()
    }, 500)
  }

  formSubmit() {
    this.$emit('submit', {
      ...this.model
    })
    this.hideDialog()
  }

  reset() {
    this.$refs['form'].resetFields()
  }
}
</script>
