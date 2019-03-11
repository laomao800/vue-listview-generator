<template>
  <ElPopover v-model="visible" placement="bottom" width="200" trigger="click" transition>
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more"/>
      </span>
    </slot>
    <div style="margin:-12px;padding:6px 0;">
      <FieldInput
        ref="focusInput"
        v-model="internalConfig.text"
        title="按钮文本"
        placeholder="按钮文本"
        maxlength="16"
      />

      <FieldDivider/>

      <FieldButtonType v-model="internalConfig.type" :plain="internalConfig.plain"/>
      <FieldIcons title="按钮图标" v-model="internalConfig.icon"/>
      <FieldItemBasic
        title="线框型按钮"
        @click.native="$set(internalConfig, 'plain', !internalConfig.plain)"
      >
        <ElSwitch :value="internalConfig.plain" size="mini"/>
      </FieldItemBasic>

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
  color: #999;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background: @color-gray-light-2;
  }
}
</style>
