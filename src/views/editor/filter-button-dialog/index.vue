<template>
  <ElDialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    title="添加操作按钮"
    width="800px"
  >
    <div slot="footer" class="dialog-footer">
      <ElButton @click="hideDialog">
        取 消
      </ElButton>
      <ElButton type="primary" @click="formSubmit">
        确 定
      </ElButton>
    </div>

    <!-- <el-form-item label="添加类型" style="margin-bottom:18px;">
      <el-radio-group v-model="configType" size="small">
        <el-radio-button label="object">常规</el-radio-button>
        <el-radio-button label="jsx">自定义 (JSX)</el-radio-button>
      </el-radio-group>
    </el-form-item> -->

    <div v-show="configType === 'object'">
      <ElRow :gutter="20">
        <ElCol :span="12">
          <ElForm
            ref="form"
            :model="model"
            size="small"
            label-width="120px"
          >
            <ElFormItem label="按钮文字" prop="text">
              <ElInput
                v-model="model.text"
                maxlength="20"
                style="width:240px"
              />
            </ElFormItem>
            <ElFormItem label="按钮类型" prop="type">
              <ElSelect v-model="model.type" style="width:240px">
                <span
                  slot="prefix"
                  :class="[
                    'button-color-preview',
                    {
                      [`button-color-preview--${model.type}`]: model.type,
                      'button-color-preview--plain': model.plain,
                    }
                  ]"
                  style="margin-left: 4px;margin-top: -2px;"
                />
                <ElOption
                  v-for="(type, index) in buttonTypes"
                  :key="index"
                  :label="type"
                  :value="type"
                >
                  <span
                    :class="[
                      'button-color-preview',
                      {
                        [`button-color-preview--${type}`]: type,
                        'button-color-preview--plain': model.plain,
                      }
                    ]"
                  />
                  <span>{{ type }}</span>
                </ElOption>
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="按钮图标" prop="icon">
              <IconSelector v-model="model.icon" style="width:240px" />
            </ElFormItem>
            <ElFormItem label="线框型按钮" prop="plain">
              <ElSwitch v-model="model.plain" />
            </ElFormItem>
            <!-- TODO: 下拉按钮 -->
          </ElForm>
        </ElCol>

        <ElCol :span="12">
          <div class="preview-area">
            <ElButton v-bind="model" size="small">
              {{ model.text }}
            </ElButton>
          </div>
        </ElCol>
      </ElRow>
    </div>

    <AceEditor
      v-if="configType === 'jsx'"
      ref="jsxEditor"
      :content="jsxString"
      lang="jsx"
      height="200"
    />
  </ElDialog>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import IconSelector from '@/components/icon-selector/index.vue'

const defaultJSXString =
  '<el-button type="primary" size="small">按钮</el-button>'

@Component({
  components: {
    IconSelector
  }
})
export default class FilterButtonDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  public visible!: boolean
  @Prop({ type: Object, default: null })
  public editModel!: object

  public $refs: any

  public model = {
    type: 'default',
    plain: false,
    icon: '',
    text: '按钮文字'
    // TODO: click
    // onClick: ''
  }
  public buttonTypes = [
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger'
  ]
  public configType = 'object'
  public jsxString = defaultJSXString

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
    if (this.configType === 'object') {
      this.addButtonByObject()
    } else if (this.configType === 'jsx') {
      this.addButtonByJSX()
    }
  }

  addButtonByObject() {
    if (_.isEmpty(this.model.text) && _.isEmpty(this.model.icon)) {
      this.$message.error('按钮文字或按钮图标至少填写一项。')
      return
    }
    // 显式提供 key 用于 v-for ，避免遍历时使用序号出现渲染延迟导致界面跳动
    this.$emit('submit', {
      key: Math.random(),
      type: 'object',
      data: _.cloneDeep(this.model)
    })
    this.hideDialog()
  }

  addButtonByJSX() {
    const jsxString = this.$refs.jsxEditor.getValue()
    const wrap = document.createElement('div')
    wrap.innerHTML = jsxString
    // 包含 2 个以上的子节点包裹 div 再返回
    this.$emit('submit', {
      key: +new Date(),
      type: 'jsx',
      data: wrap.childElementCount < 2 ? jsxString : wrap.outerHTML
    })
    this.hideDialog()
  }

  reset() {
    this.$refs['form'].resetFields()
    this.configType = 'object'
    this.jsxString = defaultJSXString
  }
}
</script>

<style lang="less" scoped>
.preview-area {
  position: relative;
  padding: 45px 15px 15px;
  margin-bottom: 25px;
  text-align: center;
  border: 1px solid #e9edf4;
  border-radius: 4px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    font-size: 12px;
    line-height: 30px;
    content: '效果预览';
    background-color: #e9edf4;
  }
}

.button-color-preview {
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
  border: 1px solid;

  &::after {
    display: block;
    width: 15px;
    height: 10px;
    content: '';
    background-color: #fff;
    opacity: 0;
  }

  &--plain {
    &::after {
      opacity: 0.8;
    }
  }

  &--default {
    background-color: #fff;
    border-color: #dcdfe6;
  }
  &--primary {
    background-color: #409eff;
    border-color: #409eff;
  }
  &--success {
    background-color: #67c23a;
    border-color: #67c23a;
  }
  &--info {
    background-color: #909399;
    border-color: #909399;
  }
  &--warning {
    background-color: #e6a23c;
    border-color: #e6a23c;
  }
  &--danger {
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
}
</style>
