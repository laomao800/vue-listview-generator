<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="添加操作按钮"
    width="640px"
  >
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="formSubmit">确 定</el-button>
    </div>

    <el-form
      ref="form"
      :model="model"
      label-width="120px"
    >
      label
      prop
      width
      align
      fixed
      formatter
      render
      children
    </el-form>
  </el-dialog>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'AddTableColumnDialog',

  props: {
    visible: { type: Boolean, default: false }
  },

  data() {
    return {
      model: {
        label: null,
        prop: null,
        width: null,
        align: null,
        fixed: null
      }
    }
  },

  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        if (val === false) {
          this.hideDialog()
        }
      }
    }
  },

  methods: {
    hideDialog() {
      this.$emit('update:visible', false)
      // 避免界面跳动，关闭动画播放完毕后再重置内容
      setTimeout(() => {
        this.$refs['form'].resetFields()
      }, 500)
    },
    formSubmit() {
      const columnConfig = _.cloneDeep(this.model)
      this.$emit('submit', columnConfig)
      this.hideDialog()
    }
  }
}
</script>
