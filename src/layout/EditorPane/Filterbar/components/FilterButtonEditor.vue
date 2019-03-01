<template>
  <ElPopover v-model="visible" placement="bottom" width="200" trigger="click" transition>
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more" style="color:#999"/>
      </span>
    </slot>
    <div style="margin:-12px;padding:6px 0;">
      <div style="padding:0 6px">
        <ElInput ref="textInput" v-model="internalConfig.text" placeholder="按钮文本" maxlength="16"/>
      </div>

      <FieldDivider/>

      <FieldButtonType v-model="internalConfig.type" :plain="internalConfig.plain"/>
      <FieldIcons v-model="internalConfig.icon"/>
      <FieldItemBasic
        text="线框型按钮"
        @click.native="$set(internalConfig, 'plain', !internalConfig.plain)"
      >
        <ElSwitch slot="right" :value="internalConfig.plain" size="mini"/>
      </FieldItemBasic>

      <FieldDivider/>

      <FieldItemBasic icon="copy" text="复制" @click.native="handleCopy"/>
      <FieldItemBasic icon="delete" text="删除" @click.native="handleDelete"/>
    </div>
  </ElPopover>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'decko'
import { FilterButton } from '@laomao800/vue-listview'

@Component
export default class FilterButtonEditor extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  public config!: FilterButton

  @Prop({ type: Function, default: () => {} })
  public handleDelete!: () => void

  public $refs: any
  public visible: boolean = false
  public internalConfig: FilterButton = {}

  @Watch('config', { immediate: true })
  configChanged(newVal: FilterButton) {
    if (!_.isEqual(newVal, this.internalConfig)) {
      this.internalConfig = _.cloneDeep(newVal)
    }
  }

  @Watch('internalConfig', { deep: true })
  internalConfigChanged(newVal: FilterButton) {
    if (!_.isEqual(newVal, this.config)) {
      this.$emit('change', _.cloneDeep(newVal))
    }
  }

  @Watch('visible')
  async visibleChanged(newVal: boolean) {
    if (newVal) {
      await this.$nextTick()
      this.$refs.textInput.focus()
      this.$refs.textInput.$refs.input.select()
    }
  }

  @debounce
  syncConfig() {
    this.$emit('change', this.internalConfig)
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
