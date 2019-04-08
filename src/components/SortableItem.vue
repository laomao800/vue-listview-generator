<template>
  <div :class="$style.item">
    <div v-handle class="drag-handle" :class="$style.handle">
      <SvgIcon name="drag"/>
    </div>
    <div :class="$style.inner">
      <div :class="$style.content">
        <slot/>
      </div>
      <div v-if="$slots.right" :class="$style.right">
        <slot name="right"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ElementMixin, HandleDirective } from 'vue-slicksort'

@Component({
  // @ts-ignore
  mixins: [ElementMixin],
  directives: { handle: HandleDirective }
})
export default class SortableItem {}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.item {
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-top: -1px;
  }
}

.inner {
  display: flex;
  flex: 1;
  align-items: center;
  min-height: 28px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 120%;
  user-select: none;
  background-color: @main-background-color;
  border-top: 1px solid @color-gray-light-3;
  border-bottom: 1px solid @color-gray-light-3;
  border-radius: 3px;
  transition: background 120ms ease-in;

  &:hover {
    background-color: @color-gray-light-5;
  }
}

.handle {
  width: 20px;
  height: 28px;
  // margin-left: -20px;
  font-size: 20px;
  line-height: 28px;
  color: #666;
  pointer-events: auto;
  cursor: move;
  cursor: -webkit-grab;
  border-radius: 3px;
}

.content {
  flex: 1;
  overflow: hidden;
  cursor: default;
}
</style>
