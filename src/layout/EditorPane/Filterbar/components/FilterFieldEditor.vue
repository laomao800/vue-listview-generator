<template>
  <ElPopover v-model="visible" placement="bottom" width="200" trigger="click" transition>
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more" style="color:#999"/>
      </span>
    </slot>
    <div style="margin:-12px;padding:6px 0;">
      <FieldInput inline title="参数名">
        <ElInput v-model="internalConfig.model" placeholder="参数名"/>
      </FieldInput>
      <FieldInput inline v-if="internalConfig.type !== 'label'" title="文本标签">
        <ElInput
          ref="focusInput"
          v-model="internalConfig.label"
          size="mini"
          placeholder="文本标签"
          maxlength="16"
        />
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

      <!-- <FieldFilterFieldType v-model="internalConfig.type" :plain="internalConfig.plain"/> -->
      <!--
      <FieldDivider/>

      <FieldButtonType v-model="internalConfig.type" :plain="internalConfig.plain"/>
      <FieldIcons v-model="internalConfig.icon"/>
      <FieldItemBasic
        text="线框型按钮"
        @click.native="$set(internalConfig, 'plain', !internalConfig.plain)"
      >
        <ElSwitch slot="right" :value="internalConfig.plain" size="mini"/>
      </FieldItemBasic>
      -->
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

interface AllFieldConfig {
  [k: string]: FilterField
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
  public allFieldConfig: AllFieldConfig = {}
  public internalConfig: FilterField = {}

  @Watch('config', { immediate: true })
  configChanged(newVal: FilterField) {
    const targetConfig = this.allFieldConfig[this.fieldType!]
    if (!_.isEqual(newVal, targetConfig)) {
      this.internalConfig = _.cloneDeep(newVal)
    }
  }

  @Watch('internalConfig', { deep: true })
  internalConfigChanged(newVal: FilterField) {
    if (!_.isEqual(newVal, this.config)) {
      this.$emit('change', _.cloneDeep(newVal))
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
    // TODO: computed
    this.$emit('change', this.allFieldConfig[this.fieldType!] || {})
  }

  handleCopy() {
    // TODO: computed
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
