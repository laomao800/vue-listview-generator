<template>
  <ElDialog :visible.sync="dialogVisible" title="添加操作按钮" width="640px">
    <div slot="footer" class="dialog-footer">
      <ElButton @click="hideDialog">
        取 消
      </ElButton>
      <ElButton type="primary" @click="formSubmit">
        确 定
      </ElButton>
    </div>

    <ElForm ref="form" :model="model" label-width="120px">
      label prop width align fixed formatter render children
    </ElForm>
  </ElDialog>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'AddTableColumnDialog',

  props: {
    visible: { type: Boolean, default: false }
  },

  data () {
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
      get () {
        return this.visible
      },
      set (val) {
        if (val === false) {
          this.hideDialog()
        }
      }
    }
  },

  methods: {
    hideDialog () {
      this.$emit('update:visible', false)
      // 避免界面跳动，关闭动画播放完毕后再重置内容
      setTimeout(() => {
        this.$refs['form'].resetFields()
      }, 500)
    },
    formSubmit () {
      const columnConfig = _.cloneDeep(this.model)
      this.$emit('submit', columnConfig)
      this.hideDialog()
    }
  }
}
</script>
