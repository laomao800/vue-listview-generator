<template>
  <ElDialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    title="添加操作按钮"
    width="800px"
  >
    <div
      slot="footer"
      class="dialog-footer"
    >
      <ElButton @click="hideDialog">
        取 消
      </ElButton>
      <ElButton
        type="primary"
        @click="formSubmit"
      >
        确 定
      </ElButton>
    </div>
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
}
</script>
