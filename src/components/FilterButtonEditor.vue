<template>
  <ElPopover v-model="visible" placement="bottom" width="200" trigger="click" transition>
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more" style="color:#999"/>
      </span>
    </slot>
    <div style="margin:-10px">
      <div class="config-field">
        <ElInput ref="textInput" v-model="internalConfig.text" maxlength="16"/>
      </div>
      <div class="config-field">
        <ButtonTypeSelect v-model="internalConfig.type" :plain="internalConfig.plain"/>
      </div>
      <div class="config-field">
        <span>线框型按钮</span>
        <ElSwitch v-model="internalConfig.plain"/>
      </div>
      <div class="config-field">
        <IconSelector v-model="internalConfig.icon"/>
      </div>
      <!--
        ---操作---
        - 复制
        - 删除
      -->
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
  @Prop({ type: Object, default: () => ({}) }) public config!: FilterButton

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
    }
  }

  @debounce
  syncConfig() {
    this.$emit('change', this.internalConfig)
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
