<template>
  <ElPopover
    ref="popper"
    v-model="visible"
    :offset="-10"
    placement="right-start"
    width="220"
    trigger="click"
    transition
  >
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more"/>
      </span>
    </slot>
    <div style="margin:-12px;padding:6px 0;">
      <FieldFilterFieldType v-model="curType"/>

      <FieldDivider title="公共属性"/>

      <FieldInput
        ref="focusInput"
        v-model="internalConfig.label"
        title="文本标签"
        placeholder="文本标签"
        maxlength="16"
      />
      <FieldInput
        v-if="internalConfig.type !== 'label'"
        v-model="internalConfig.model"
        title="参数名"
        placeholder="参数名"
      />
      <FieldInput
        v-model.number="internalConfig.width"
        :placeholder="widthPlaceholder"
        title="宽度"
        type="number"
        clearable
      >
        <template slot="append">px</template>
      </FieldInput>

      <FieldDivider v-if="curType !== 'label'" title="字段配置"/>

      <template v-if="curType === 'text'">
        <FieldIcons title="前置图标" v-model="internalConfig.componentProps.prefixIcon"/>
        <FieldIcons title="后置图标" v-model="internalConfig.componentProps.suffixIcon"/>
      </template>

      <template v-else-if="curType === 'number'">
        <FieldInput
          title="最小值"
          v-model.number="internalConfig.componentProps.min"
          type="number"
          input-width="70"
        />
        <FieldInput
          title="最大值"
          v-model.number="internalConfig.componentProps.max"
          type="number"
          input-width="70"
        />
        <FieldInput
          title="控制器步进值"
          v-model.number="internalConfig.componentProps.step"
          type="number"
          placeholder="1"
          input-width="70"
        />
      </template>

      <!-- 下拉选择类 -->
      <template v-else-if="['select', 'multipleSelect', 'cascader'].includes(curType)">
        <FieldItemBasic icon="gear" title="配置选项" @click.native="editSelectOptions">
          <span style="color:#999;">({{ internalConfig.options.length }}项)</span>
        </FieldItemBasic>
      </template>

      <!-- 日期类 -->
      <template v-else-if="['date', 'dateRange', 'dateTime', 'dateTimeRange'].includes(curType)">
        <template v-if="curType === 'date'">
          <FieldDateType v-model="internalConfig.componentProps.type"/>
        </template>

        <FieldIcons title="前置图标" v-model="internalConfig.componentProps.prefixIcon"/>

        <template v-if="curType === 'dateTime'">
          <!-- 无 -->
        </template>

        <template v-if="['dateRange', 'dateTimeRange'].includes(curType)">
          <FieldInput title="开始占位内容" placeholder="开始日期"/>
          <FieldInput title="结束占位内容" placeholder="结束日期"/>
        </template>

        <FieldInput
          v-model="internalConfig.componentProps.format"
          block
          :placeholder="curType.indexOf('dateTime') > -1 ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'"
          title="显示格式"
          clearable
        />
        <FieldInput
          v-model="internalConfig.componentProps.valueFormat"
          block
          :placeholder="curType.indexOf('dateTime') > -1 ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'"
          title="提交格式"
          clearable
        />
      </template>

      <!-- 时间类 -->
      <template v-else-if="['timeSelect', 'timePicker', 'timePickerRange'].includes(curType)">
        <FieldIcons title="前置图标" v-model="internalConfig.componentProps.prefixIcon"/>
        <template v-if="curType === 'timeSelect'">
          <FieldInput
            v-model="internalConfig.componentProps.pickerOptions.start"
            title="开始时间"
            placeholder="09:00"
          />
          <FieldInput
            v-model="internalConfig.componentProps.pickerOptions.end"
            title="结束时间"
            placeholder="18:00"
          />
          <FieldInput
            v-model="internalConfig.componentProps.pickerOptions.step"
            title="选项跨度"
            placeholder="00:30"
          />
        </template>
        <template v-else-if="curType === 'timePicker'">
          <!-- 无 -->
        </template>
        <template v-else-if="curType === 'timePickerRange'">
          <FieldInput
            v-model="internalConfig.componentProps.startPlaceholder"
            title="开始占位内容"
            placeholder="开始时间"
          />
          <FieldInput
            v-model="internalConfig.componentProps.endPlaceholder"
            title="结束占位内容"
            placeholder="结束时间"
          />
        </template>
        <FieldInput
          v-model="internalConfig.componentProps.valueFormat"
          title="提交格式"
          placeholder="yyyy-MM-dd HH:mm:ss"
          block
          clearable
        />
      </template>

      <FieldDivider title="操作"/>

      <FieldItemBasic icon="copy" title="复制" @click.native="handleCopy"/>
      <FieldItemBasic icon="delete" title="删除" @click.native="handleDelete"/>
    </div>
  </ElPopover>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'decko'
import { FilterField } from '@laomao800/vue-listview'
import { filterFieldTypesMap } from '@/constants/filterFieldTypes'

interface AllFieldConfig {
  [k: string]: FilterField
}

function getAllFieldConfig() {
  const fieldConfig: AllFieldConfig = {}
  for (const [typeName, typeConfig] of Object.entries(filterFieldTypesMap)) {
    const config: FilterField = {
      type: typeName as FilterField['type'],
      label: typeConfig.name,
      model: typeName,
      componentProps: typeName === 'timeSelect' ? { pickerOptions: {} } : {}
    }
    if (['select', 'multipleSelect', 'cascader'].includes(typeName)) {
      config.options = []
    }
    fieldConfig[typeName] = config
  }
  return fieldConfig
}

@Component
export default class FilterFieldEditor extends Vue {
  @Prop({ type: String, required: true, default: 'text' })
  public fieldType!: FilterField['type']

  @Prop({ type: Object, default: () => ({}) })
  public config!: FilterField

  @Prop({ type: Function, default: () => {} })
  public handleDelete!: () => void

  public $refs: any
  public visible: boolean = false
  public allFieldConfig = getAllFieldConfig()
  public curType = this.config.type!

  get internalConfig() {
    return this.allFieldConfig[this.curType]
  }

  get widthPlaceholder() {
    return (
      // @ts-ignore
      {
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
      }[this.curType] || ''
    )
  }

  @Watch('config', { immediate: true })
  configChanged(newVal: FilterField) {
    this.curType = newVal.type!
    if (!_.isEqual(newVal, this.internalConfig)) {
      const target = this.allFieldConfig[this.curType!]
      const newConfig = _.merge(target, _.cloneDeep(newVal))
      this.allFieldConfig[this.curType!] = newConfig
    }
  }

  @Watch('internalConfig', { deep: true })
  internalConfigChanged(newVal: FilterField, oldVal: FilterField) {
    if (!_.isEqual(newVal, this.config)) {
      // TODO: model 值只用内部 data 中转
      newVal.model = oldVal.model
      this.syncConfig()
    }
  }

  @Watch('visible')
  visibleChanged(newVal: boolean) {
    if (newVal) {
      this.focusFirstInput()
    }
  }

  @Watch('fieldType')
  typeChanged() {
    // 切换类型弹出内容可能有变化，需更新 popper 位置
    this.$refs.popper.updatePopper()
    this.focusFirstInput()
  }

  @debounce
  syncConfig() {
    this.$emit('change', _.cloneDeep(this.internalConfig))
  }

  async focusFirstInput() {
    await this.$nextTick()
    this.$refs.focusInput.focus()
    this.$refs.focusInput.$refs.input.select()
  }

  handleCopy() {
    this.$emit('copy', _.cloneDeep(this.internalConfig))
    this.visible = false
  }

  show() {
    this.visible = true
  }

  async editSelectOptions() {
    try {
      const newOptions = await this.$store.dispatch(
        'optionsEditor/edit',
        this.internalConfig.options
      )
      this.internalConfig.options = newOptions
    } catch (e) {}
  }
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
