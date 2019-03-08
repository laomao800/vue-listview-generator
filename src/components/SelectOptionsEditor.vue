<template>
  <ElDialog title="选项编辑" :visible.sync="visible" width="640px">
    <div class="select-options-editor">
      <ElTabs v-model="activeName" :before-leave="tabBeforeLeave" type="card">
        <ElTabPane label="编辑选项" name="list">
          <div class="options-editor-list">
            <table cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="col-handle"/>
                  <th class="col-label">显示文本</th>
                  <th class="col-value">选项值</th>
                  <th class="col-action"/>
                </tr>
              </thead>
              <Draggable
                v-model="internalOptions"
                :options="{ handle: '.drag-handle', animation: 100, draggable: '.option-row' }"
                element="tbody"
              >
                <tr
                  v-for="(option, index) in internalOptions"
                  :key="index"
                  :class="{
                    'option-row': index < internalOptions.length - 1,
                    'last-row': index === internalOptions.length - 1
                  }"
                >
                  <td class="col-handle">
                    <div class="drag-handle">
                      <SvgIcon name="drag"/>
                    </div>
                  </td>
                  <td class="col-label">
                    <ElInput
                      v-model="option.label"
                      size="mini"
                      @input="() => index === internalOptions.length - 1 && addEmptyOption()"
                    />
                  </td>
                  <td class="col-value">
                    <ElInput
                      v-model="option.value"
                      size="mini"
                      @input="() => index === internalOptions.length - 1 && addEmptyOption()"
                    />
                  </td>
                  <td class="col-action">
                    <ElButton
                      :disabled="internalOptions.length === 1"
                      :plain="true"
                      type="danger"
                      tabindex="-1"
                      @click="deleteOption(index)"
                    >
                      <i class="el-icon-delete"/>
                    </ElButton>
                  </td>
                </tr>
              </Draggable>
            </table>
          </div>
        </ElTabPane>
        <ElTabPane label="编辑选项 JSON" name="json">
          <div class="options-editor-json">
            <AceEditor ref="jsonEditor" :content="optionJSONString" height="300" lang="json"/>
          </div>
        </ElTabPane>
      </ElTabs>
    </div>
    <div slot="footer">
      <ElButton @click="hideDialog">取 消</ElButton>
      <ElButton type="primary" @click="emitData">确 定</ElButton>
    </div>
  </ElDialog>
</template>

<script lang="ts">
import _ from 'lodash'
import json5 from 'json5'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'
import { formatJson } from '@/utils'

interface OptionType {
  label: string
  value: any
}

const OptionsEditorModule = namespace('optionsEditor')

function validateOptionsData(data: any) {
  return (
    Array.isArray(data) &&
    data.every(
      item =>
        _.isPlainObject(item) &&
        typeof item.label === 'string' &&
        item.hasOwnProperty('value')
    )
  )
}

// TODO: cascader 类型编辑或提示
@Component
export default class SelectOptionsEditor extends Vue {
  @OptionsEditorModule.State('visible') public visible!: boolean
  @OptionsEditorModule.State('options') public initOptions!: OptionType[]
  @OptionsEditorModule.Action('hide') public hideDialog!: void

  @Prop({ type: Array, default: () => [] })
  public options!: OptionType[]

  public $refs: any
  public activeName = 'list'
  public internalOptions: OptionType[] = []
  public optionJSONString = ''

  @Watch('visible')
  visibleChanged(val: boolean) {
    if (val) {
      this.initInernalData()
    } else {
      setTimeout(() => {
        // 等待关闭动画播放后再重置数据
        this.activeName = 'list'
        this.internalOptions = []
        this.optionJSONString = ''
      }, 200)
    }
  }

  @Watch('activeName')
  activeChanged(val: string) {
    if (val === 'list') {
      this.addEmptyOption()
    }
  }

  initInernalData() {
    this.internalOptions = _.cloneDeep(this.initOptions)
    this.addEmptyOption()
  }

  // 添加“新建”占位行
  addEmptyOption() {
    this.internalOptions.push({ label: '', value: '' })
  }

  deleteOption(index: number) {
    this.internalOptions.splice(index, 1)
  }

  tabBeforeLeave(activeName: string, oldActiveName: string) {
    if (!this.visible) {
      return true
    }
    switch (activeName) {
      case 'list':
        const parsedData = this.jsonToOptions()
        if (parsedData) {
          this.internalOptions = parsedData
          this.optionJSONString = ''
        } else {
          return false
        }
        break
      case 'json':
        this.optionJSONString = formatJson(this.internalOptions.slice(0, -1))
        break
    }
    return true
  }

  jsonToOptions(): OptionType[] | null {
    try {
      const parsedData = json5.parse(this.$refs.jsonEditor.getValue())
      if (validateOptionsData(parsedData)) {
        return parsedData
      } else {
        throw Error(
          '选项必须符合类型 {label: string, value: string | number}[] 。'
        )
      }
    } catch (error) {
      this.$message.error(error.toString())
    }
    return null
  }

  emitData() {
    let finalData
    if (this.activeName === 'json') {
      finalData = this.jsonToOptions()
      if (!finalData) {
        return false
      }
    } else {
      finalData = this.internalOptions.slice(0, -1)
    }
    this.$store.dispatch('optionsEditor/emit', finalData)
  }
}
</script>

<style lang="less" scoped>
.options-editor-list {
  table {
    width: 100%;
    text-align: center;
    border: solid #ededed;
    border-width: 1px 1px 0 0;
  }

  td,
  th {
    padding: 4px 6px;
    border: solid #ededed;
    border-width: 0 0 1px 1px;
  }

  th {
    font-size: 14px;
    line-height: 1.6em;
    background-color: #f4f7fa;
  }

  .col-handle,
  .col-action {
    width: 45px;
    padding: 0;
  }
  .col-action .el-button {
    width: 30px;
    padding: 4px 8px;
    font-size: 12px;
  }

  .last-row {
    .col-handle,
    .col-action {
      > * {
        display: none;
      }
    }
  }
}
.drag-handle {
  width: 20px;
  height: 28px;
  margin: 0 auto;
  font-size: 20px;
  line-height: 28px;
  color: #666;
  pointer-events: auto;
  cursor: move;
  cursor: -webkit-grab;
  border-radius: 3px;
}
.list-header {
  padding-left: 50px;
  font-size: 12px;
  line-height: 30px;
}
.item-label,
.item-value {
  display: inline-block;
  width: 50%;
  padding: 0 10px;
}
</style>
