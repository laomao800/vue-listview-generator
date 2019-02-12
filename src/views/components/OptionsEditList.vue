<template>
  <div class="options-editor">
    <ElTabs v-model="activeName" :before-leave="tabBeforeLeave" type="card">
      <ElTabPane label="以选项编辑" name="list">
        <div class="options-editor-list">
          <table cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th class="col-handle" />
                <th class="col-label">
                  显示文本
                </th>
                <th class="col-value">
                  选项值
                </th>
                <th class="col-action" />
              </tr>
            </thead>
            <Draggable
              v-model="internalOptions"
              :options="{
                handle: '.drag-handle',
                animation: 100,
                draggable: '.option-row'
              }"
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
                  <div class="drag-handle" />
                </td>
                <td class="col-label">
                  <ElInput
                    v-model="option.label"
                    size="mini"
                    @input="
                      () =>
                        index === internalOptions.length - 1 && addEmptyOption()
                    "
                  />
                </td>
                <td class="col-value">
                  <ElInput
                    v-model="option.value"
                    size="mini"
                    @input="
                      () =>
                        index === internalOptions.length - 1 && addEmptyOption()
                    "
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
                    <i class="el-icon-close" />
                  </ElButton>
                </td>
              </tr>
            </Draggable>
          </table>
        </div>
      </ElTabPane>
      <ElTabPane label="以 JSON 编辑" name="json">
        <div class="options-editor-json">
          <AceEditor
            ref="jsonEditor"
            :content="optionJSONString"
            height="240"
            lang="json"
          />
        </div>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import json5 from 'json5'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { jsonToString } from '@/utils'

interface OptionType {
  label: string
  value: any
}

@Component({
  methods: {
    jsonToString
  }
})
export default class OptionsEditList extends Vue {
  @Prop({ type: Array, default: () => [] })
  public options!: OptionType[]

  public $refs: any
  public activeName = 'list'
  public internalOptions: OptionType[] = []
  public optionJSONString = ''

  @Watch('internalOptions', { deep: true })
  WatchInterOptions () {
    // 删除最后一个用于触发添加操作的辅助空数据后返回
    this.$emit('update:options', this.internalOptions.slice(0, -1))
  }

  mounted () {
    this.internalOptions = _.cloneDeep(this.options)
    this.addEmptyOption()
  }

  addEmptyOption () {
    this.internalOptions.push({
      label: '',
      value: ''
    })
  }

  deleteOption (index: number) {
    this.internalOptions.splice(index, 1)
  }

  tabBeforeLeave (activeName: string, oldActiveName: string) {
    // debugger
    switch (activeName) {
      case 'list':
        const options = this.parseOptionsJSON()
        if (!options) {
          return false
        }
        this.internalOptions = options
        this.addEmptyOption()
        this.optionJSONString = ''
        break
      case 'json':
        this.optionJSONString = jsonToString(this.internalOptions.slice(0, -1))
        break
    }
    return true
  }

  parseOptionsJSON (): OptionType[] | void {
    if (this.activeName === 'json') {
      try {
        const parseData = json5.parse(this.$refs.jsonEditor.getValue())
        if (
          Array.isArray(parseData) &&
          parseData.every(item => this.validOptionJSON(item))
        ) {
          return parseData
        } else {
          throw Error('选项必须符合规则 Array<{label: string, value: any}> 。')
        }
      } catch (error) {
        this.$message.error(error.toString())
      }
    }
  }

  validOptionJSON (option: OptionType) {
    return (
      _.isPlainObject(option) &&
      typeof option.label === 'string' &&
      option.hasOwnProperty('value')
    )
  }
}
</script>

<style lang="less" scoped>
.options-editor-list {
  table {
    width: 100%;
    border: solid #ededed;
    border-width: 1px 1px 0 0;
    text-align: center;
  }

  td,
  th {
    border: solid #ededed;
    border-width: 0 0 1px 1px;
    padding: 5px 10px;
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
    font-size: 12px;
    padding: 4px 8px;
    width: 30px;
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
.list-header {
  padding-left: 50px;
  font-size: 12px;
  lien-height: 30px;
}
.item-label,
.item-value {
  display: inline-block;
  width: 50%;
  padding: 0 10px;
}
</style>
