<template>
  <PopEditorWrap v-model="visible">
    <FieldFilterFieldType v-model="curType"/>

    <FieldDivider title="公共属性"/>

    <FieldInput
      ref="focusInput"
      v-model="editingData.label"
      title="文本标签"
      placeholder="文本标签"
      maxlength="16"
    />
    <FieldInput
      v-if="editingData.type !== 'label'"
      v-model="modelName"
      title="参数名"
      placeholder="参数名"
    />
    <FieldInput
      v-model.number="editingData.width"
      :placeholder="widthPlaceholder"
      title="宽度"
      type="number"
      clearable
    >
      <template slot="append">px</template>
    </FieldInput>

    <FieldDivider v-if="curType !== 'label'" title="字段配置"/>

    <template v-if="curType === 'text'">
      <FieldIcons title="前置图标" v-model="editingData.componentProps.prefixIcon"/>
      <FieldIcons title="后置图标" v-model="editingData.componentProps.suffixIcon"/>
    </template>

    <template v-else-if="curType === 'number'">
      <FieldInput
        title="最小值"
        v-model.number="editingData.componentProps.min"
        type="number"
        input-width="70"
      />
      <FieldInput
        title="最大值"
        v-model.number="editingData.componentProps.max"
        type="number"
        input-width="70"
      />
      <FieldInput
        title="控制器步进值"
        v-model.number="editingData.componentProps.step"
        type="number"
        placeholder="1"
        input-width="70"
      />
    </template>

    <!-- 下拉选择类 -->
    <template v-else-if="['select', 'multipleSelect', 'cascader'].includes(curType)">
      <FieldItemBasic icon="gear" title="配置选项" @click.native="showOptionsDialog">
        <span style="color:#999;">({{ editingData.options.length }}项)</span>
      </FieldItemBasic>
    </template>

    <!-- 日期类 -->
    <template v-else-if="['date', 'dateRange', 'dateTime', 'dateTimeRange'].includes(curType)">
      <template v-if="curType === 'date'">
        <FieldDateType v-model="editingData.componentProps.type"/>
      </template>

      <FieldIcons title="前置图标" v-model="editingData.componentProps.prefixIcon"/>

      <template v-if="curType === 'dateTime'">
        <!-- 无 -->
      </template>

      <template v-if="['dateRange', 'dateTimeRange'].includes(curType)">
        <FieldInput
          v-model="editingData.componentProps.startPlaceholder"
          title="开始占位内容"
          placeholder="开始日期"
        />
        <FieldInput
          v-model="editingData.componentProps.endPlaceholder"
          title="结束占位内容"
          placeholder="结束日期"
        />
      </template>

      <FieldInput
        v-model="editingData.componentProps.format"
        block
        :placeholder="curType.indexOf('dateTime') > -1 ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'"
        title="显示格式"
        clearable
      />
      <FieldInput
        v-model="editingData.componentProps.valueFormat"
        block
        :placeholder="curType.indexOf('dateTime') > -1 ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'"
        title="提交格式"
        clearable
      />
    </template>

    <!-- 时间类 -->
    <template v-else-if="['timeSelect', 'timePicker', 'timePickerRange'].includes(curType)">
      <FieldIcons title="前置图标" v-model="editingData.componentProps.prefixIcon"/>
      <template v-if="curType === 'timeSelect'">
        <FieldInput
          v-model="editingData.componentProps.pickerOptions.start"
          title="开始时间"
          placeholder="09:00"
        />
        <FieldInput
          v-model="editingData.componentProps.pickerOptions.end"
          title="结束时间"
          placeholder="18:00"
        />
        <FieldInput
          v-model="editingData.componentProps.pickerOptions.step"
          title="选项跨度"
          placeholder="00:30"
        />
      </template>
      <template v-else-if="curType === 'timePicker'">
        <!-- 无 -->
      </template>
      <template v-else-if="curType === 'timePickerRange'">
        <FieldInput
          v-model="editingData.componentProps.startPlaceholder"
          title="开始占位内容"
          placeholder="开始时间"
        />
        <FieldInput
          v-model="editingData.componentProps.endPlaceholder"
          title="结束占位内容"
          placeholder="结束时间"
        />
      </template>
      <FieldInput
        v-model="editingData.componentProps.valueFormat"
        title="提交格式"
        placeholder="yyyy-MM-dd HH:mm:ss"
        block
        clearable
      />
    </template>

    <FieldDivider title="操作"/>

    <FieldItemBasic icon="copy" title="复制" @click.native="emitCopy"/>
    <FieldItemBasic icon="delete" title="删除" @click.native="emitDelete"/>
  </PopEditorWrap>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { FilterField } from '@laomao800/vue-listview'
import { filterFieldTypesMap } from '@/constants/filterFieldTypes'
import PopEditorBase from '../PopEditorBase'
import PopEditorWrap from '@/layout/EditorPane/components/PopEditorWrap.vue'
import SelectOptionsEditor from '@/service/SelectOptionsEditor'

interface AllFieldData {
  [k: string]: FilterField
}

function getAllFieldData() {
  const fieldData: AllFieldData = {}
  for (const [typeName, typeData] of Object.entries(filterFieldTypesMap)) {
    const data: FilterField = {
      type: typeName as FilterField['type'],
      label: typeData.name,
      model: typeName,
      componentProps: typeName === 'timeSelect' ? { pickerOptions: {} } : {}
    }
    if (['select', 'multipleSelect', 'cascader'].includes(typeName)) {
      data.options = []
    }
    fieldData[typeName] = data
  }
  return fieldData
}

const widthPresetMap: {
  [k: string]: number
} = {
  text: 180,
  number: 100,
  select: 180,
  multipleSelect: 180,
  cascader: 180,
  date: 180,
  dateTime: 200,
  dateRange: 240,
  dateTimeRange: 360,
  timeSelect: 120,
  timePicker: 120,
  timePickerRange: 200
}

@Component({
  components: {
    PopEditorWrap
  }
})
export default class FilterFieldEditor extends PopEditorBase {
  public allFieldData = getAllFieldData()
  public curType = this.data.type!
  public modelName = ''

  get widthPlaceholder() {
    return widthPresetMap[this.curType] || ''
  }

  @Watch('data', { immediate: true })
  dataChanged(newVal: FilterField) {
    this.curType = newVal.type!
    this.modelName = this.modelName || newVal.model || ''
    if (!_.isEqual(newVal, this.editingData)) {
      const target = this.allFieldData[this.curType!]
      const newData = _.merge({}, target, _.cloneDeep(newVal))
      this.allFieldData[this.curType!] = newData
    }
  }

  @Watch('curType')
  async typeChanged() {
    this.editingData = this.allFieldData[this.curType]
    // 切换类型弹出内容可能有变化，需更新 popper 位置
    await this.$nextTick()
    this.$refs.popper.updatePopper()
    this.autoFocusInput()
  }

  @Watch('modelName')
  modelChanged(newVal: string) {
    this.editingData.model = newVal
  }

  created() {
    this.editingData = this.allFieldData[this.curType]
  }

  async showOptionsDialog() {
    try {
      const newOptions = await SelectOptionsEditor({
        options: this.editingData.options
      })
      this.editingData.options = newOptions
    } catch (e) {}
  }
}
</script>
