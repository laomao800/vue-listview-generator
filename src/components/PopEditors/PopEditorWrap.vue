<template>
  <ElPopover
    ref="popper"
    v-model="internalVisible"
    :offset="-10"
    placement="right-start"
    width="200"
    trigger="click"
    transition
    v-bind="$attrs"
  >
    <span slot="reference" :class="$style.more">
      <SvgIcon name="more" />
    </span>
    <div :class="$style.content">
      <slot />
    </div>
  </ElPopover>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Model } from 'vue-property-decorator'
import { debounce } from 'decko'

@Component
export default class PopEditorWrap extends Vue {
  @Model('input', { type: Boolean, default: false })
  public visible!: boolean

  public $refs: any

  get internalVisible() {
    return this.visible
  }

  set internalVisible(val) {
    this.$emit('input', val)
  }

  updatePopper() {
    this.$refs.popper.updatePopper()
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.content {
  padding: 6px 0;
  margin: -12px;
}

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
