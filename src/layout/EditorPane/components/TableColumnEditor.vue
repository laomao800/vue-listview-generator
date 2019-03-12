<template>
  <ElPopover v-model="visible" placement="right" width="240" trigger="click" transition>
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more"/>
      </span>
    </slot>
    <div style="margin:-12px;padding:6px 0;">
      <FieldInput
        ref="focusInput"
        v-model="internalConfig.label"
        title="列头文本"
        placeholder="列头文本"
        maxlength="16"
      />

      <FieldInput v-model.number="internalConfig.width" title="列宽" type="number" clearable>
        <template slot="append">px</template>
      </FieldInput>

      <FieldItemBasic title="对齐" static>
        <ElRadioGroup v-model="internalConfig.align" size="mini">
          <ElRadioButton :label="undefined">
            <SvgIcon name="align-left"/>
          </ElRadioButton>
          <ElRadioButton label="center">
            <SvgIcon name="align-center"/>
          </ElRadioButton>
          <ElRadioButton label="right">
            <SvgIcon name="align-right"/>
          </ElRadioButton>
        </ElRadioGroup>
      </FieldItemBasic>

      <FieldItemBasic title="固定列" static>
        <ElRadioGroup v-model="internalConfig.fixed" size="mini">
          <ElRadioButton title="左对齐" :label="undefined">无</ElRadioButton>
          <ElRadioButton title="居中对齐" :label="true">左</ElRadioButton>
          <ElRadioButton title="右对齐" label="right">右</ElRadioButton>
        </ElRadioGroup>
      </FieldItemBasic>

      <template v-if="!useJsx">
        <FieldDivider/>

        <FieldInput
          v-model="internalConfig.prop"
          title="内容属性名"
          placeholder="内容属性名"
          maxlength="16"
          style="margin-bottom:4px;"
        />

        <FieldItemBasic icon="gear" title="内容格式化" @click.native="openFormatterEditor">
          <span
            v-if="internalConfig.formatter"
            style="font-size:12px;color:#009EF7;"
            @click.stop="deleteFormatter(internalConfig)"
          >清除</span>
        </FieldItemBasic>
      </template>

      <!--
      <FieldDivider/>

      <FieldItemBasic icon="code" title="使用 JSX 内容" @click.native="useJsx = !useJsx">
        <ElSwitch :value="useJsx" size="mini"/>
      </FieldItemBasic>
      <FieldItemBasic v-if="useJsx" icon="function" title="编辑内容" @click.native="openJsxEditor"/>
      -->
      <FieldDivider/>

      <FieldItemBasic icon="copy" title="复制" @click.native="handleCopy"/>
      <FieldItemBasic icon="delete" title="删除" @click.native="handleDelete"/>
    </div>
  </ElPopover>
</template>

<script lang="tsx">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'decko'
import { TableColumn } from '@laomao800/vue-listview'

const renderFuncString =
  'function render(scope) {\n' +
  '  // console.log(scope.row);\n' +
  '  // console.log(scope.column);\n' +
  '  // console.log(scope.$index);\n' +
  '  // return <strong>{scope.row.name}</strong>\n' +
  '}'

const formatterFuncString =
  'function formatter(row, column, cellValue, index) {\n' +
  '  // 可进行简单的文本格式处理后返回，如：\n' +
  '  // return row.discount.toFixed(2)\n' +
  '}'

@Component
export default class TableColumnEditor extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  public config!: TableColumn

  @Prop({ type: Function, default: () => {} })
  public handleDelete!: () => void

  public $refs: any
  public visible: boolean = false
  public internalConfig: TableColumn = {}
  public useJsx = false

  @Watch('config', { immediate: true })
  configChanged(newVal: TableColumn) {
    if (!_.isEqual(newVal, this.internalConfig)) {
      this.internalConfig = _.cloneDeep(newVal)
    }
  }

  @Watch('internalConfig', { deep: true })
  internalConfigChanged(newVal: TableColumn) {
    if (!_.isEqual(newVal, this.config)) {
      this.syncConfig()
    }
  }

  @Watch('visible')
  async visibleChanged(newVal: boolean) {
    if (newVal) {
      await this.$nextTick()
      this.$refs.focusInput.focus()
      this.$refs.focusInput.$refs.input.select()
    }
  }

  @debounce
  syncConfig() {
    this.$emit('change', _.cloneDeep(this.internalConfig))
  }

  handleCopy() {
    this.$emit('copy', _.cloneDeep(this.internalConfig))
    this.visible = false
  }

  show() {
    this.visible = true
  }

  async deleteFormatter() {
    try {
      await this.$confirm('确认清除格式化方法？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      this.$delete(this.internalConfig, 'formatter')
    } catch (e) {}
  }

  openFormatterEditor() {
    const funcString = _.isFunction(this.internalConfig.formatter)
      ? this.internalConfig.formatter.toString()
      : formatterFuncString
    this.$store.dispatch('editorDialog/show', {
      data: funcString,
      title: 'formatter()',
      onSuccess: (done: () => void, editorContent: string) => {
        try {
          // eslint-disable-next-line no-new-func
          const func = new Function(`return ${editorContent}`)()
          if (_.isFunction(func)) {
            this.$set(this.internalConfig, 'formatter', func)
            done()
          } else {
            this.$message.error('内容必须为合法 function')
          }
        } catch (e) {
          this.$message.error(e.toString())
        }
      }
    })
  }

  // TODO: function JSX parse
  // openJsxEditor() {
  //   const funcString = _.isFunction(this.internalConfig.render)
  //     ? this.internalConfig.render.toString()
  //     : renderFuncString
  //   this.$store.dispatch('editorDialog/show', {
  //     data: funcString,
  //     title: 'render()',
  //     onSuccess: (done: () => void, editorContent: string) => {
  //       // eslint-disable-next-line no-new-func
  //       const newFunc = new Function(`return ${editorContent}`)()
  //       this.internalConfig.render = newFunc
  //       done()
  //     }
  //   })
  // }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.more {
  padding: 2px;
  color: #999;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background: @color-gray-light-2;
  }
}
</style>
