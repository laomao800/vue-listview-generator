<template>
  <ElPopover v-model="visible" placement="bottom" width="200" trigger="click" transition>
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more" style="color:#999"/>
      </span>
    </slot>
    <div style="margin:-12px;padding:6px 0;">
      <FieldFilterFieldType v-model="curType"/>

      <FieldDivider/>

      <FieldInput inline title="文本标签">
        <ElInput
          ref="focusInput"
          v-model="internalConfig.label"
          size="mini"
          placeholder="文本标签"
          maxlength="16"
        />
      </FieldInput>
      <FieldInput v-if="internalConfig.type !== 'label'" inline title="参数名">
        <ElInput v-model="internalConfig.model" placeholder="参数名"/>
      </FieldInput>
      <FieldInput inline title="宽度">
        <ElInput
          v-model.number="internalConfig.width"
          :placeholder="widthPlaceholder"
          style="width:110px"
          type="number"
          size="mini"
          clearable
        >
          <template slot="append">px</template>
        </ElInput>
      </FieldInput>

      <FieldDivider/>

      <template v-if="curType === 'text'">
        <FieldIcons title="前置图标" v-model="internalConfig.componentProps.prefixIcon"/>
        <FieldIcons title="后置图标" v-model="internalConfig.componentProps.suffixIcon"/>
      </template>

      <FieldDivider/>

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
import { filterFieldTypes } from '@/constants/filterFieldTypes'

interface AllFieldConfig {
  [k: string]: FilterField
}

function getAllFieldConfig(): AllFieldConfig {
  return _.zipObject(
    filterFieldTypes.map(item => item.type),
    filterFieldTypes.map<FilterField>(item => ({
      type: item.type as FilterField['type'],
      label: item.name,
      model: item.type,
      componentProps: {}
    }))
  )
}

@Component
export default class FilterFieldEditor extends Vue {
  @Prop({ type: String, required: true, default: 'text' })
  public fieldType!: FilterField['type']

  @Prop({ type: Object, default: () => ({}) })
  public config!: FilterField

  @Prop({ type: Function, default: () => {} })
  public handleDelete!: () => void

  @Prop({ type: Number, default: null })
  public widthPlaceholder!: object

  public $refs: any
  public visible: boolean = false
  public allFieldConfig = getAllFieldConfig()
  public curType = this.config.type!

  get internalConfig() {
    return this.allFieldConfig[this.curType!]
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
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.more {
  padding: 2px;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background: @color-gray-light-2;
  }
}
</style>
