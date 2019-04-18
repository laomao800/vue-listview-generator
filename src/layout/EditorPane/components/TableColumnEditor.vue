<template>
  <PopEditorWrap v-model="visible">
    <FieldInput
      ref="focusInput"
      v-model="editingData.label"
      title="列头文本"
      placeholder="列头文本"
      maxlength="16"
    />

    <FieldInput v-model.number="editingData.width" title="列宽" type="number" clearable>
      <template slot="append">px</template>
    </FieldInput>

    <FieldItemBasic title="对齐" static style="margin-top:4px">
      <ElRadioGroup v-model="editingData.align" size="mini">
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
      <ElRadioGroup v-model="editingData.fixed" size="mini">
        <ElRadioButton title="左对齐" :label="undefined">无</ElRadioButton>
        <ElRadioButton title="居中对齐" :label="true">左</ElRadioButton>
        <ElRadioButton title="右对齐" label="right">右</ElRadioButton>
      </ElRadioGroup>
    </FieldItemBasic>

    <template v-if="!useJsx">
      <FieldDivider/>

      <FieldInput
        v-if="!editingData.formatter"
        v-model="editingData.prop"
        title="属性名"
        placeholder="属性名"
        maxlength="16"
        style="margin-bottom:8px"
      />

      <FieldItemBasic icon="gear" title="自定义内容" @click.native="openFormatterEditor">
        <span
          v-if="editingData.formatter"
          style="font-size:12px;color:#009EF7;"
          @click.stop="deleteFormatter(editingData)"
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

    <FieldItemBasic icon="copy" title="复制" @click.native="emitCopy"/>
    <FieldItemBasic icon="delete" title="删除" @click.native="emitDelete"/>
  </PopEditorWrap>
</template>

<script lang="tsx">
import _ from 'lodash'
import { Component } from 'vue-property-decorator'
import PopEditorBase from '../PopEditorBase'
import PopEditorWrap from '@/layout/EditorPane/components/PopEditorWrap.vue'
import { isFunctionString, prettify } from '@/utils'
import codeDialogServices from '@/service/CodeDialog'

const renderFuncString =
  'function render(scope) {\n' +
  '  // console.log(scope.row);\n' +
  '  // console.log(scope.column);\n' +
  '  // console.log(scope.$index);\n' +
  '  // return <strong>{scope.row.name}</strong>\n' +
  '}'

const defaultFormatterFuncString =
  'function formatter(row, column, cellValue, index) {\n' +
  '  // 可进行简单的文本格式处理后返回，如：\n' +
  '  // return row.number_property.toFixed(2)\n' +
  '}'

@Component({
  components: {
    PopEditorWrap
  }
})
export default class TableColumnEditor extends PopEditorBase {
  public useJsx = false

  async deleteFormatter() {
    try {
      await this.$confirm('确认清除格式化方法？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      this.$delete(this.editingData, 'formatter')
    } catch (e) {}
  }

  openFormatterEditor() {
    let funcString = ''
    const existFormatter = this.editingData.formatter
    if (_.isString(existFormatter)) {
      funcString = this.editingData.formatter
    } else if (_.isFunction(existFormatter)) {
      funcString = existFormatter.toString()
    }
    funcString = funcString || defaultFormatterFuncString

    const formatterDialog = codeDialogServices({
      title: 'formatter()',
      content: prettify(funcString),
      width: 800,
      height: 300,
      buttons: [
        { text: '关闭', click: () => formatterDialog.hide() },
        {
          text: '确定',
          type: 'primary',
          click: (content: string) => {
            try {
              if (isFunctionString(content)) {
                this.$set(this.editingData, 'formatter', content)
                formatterDialog.hide()
              } else {
                this.$message.error('内容必须为合法 function 定义')
              }
            } catch (e) {
              this.$message.error(e.toString())
            }
          }
        }
      ]
    })
  }
}
</script>
