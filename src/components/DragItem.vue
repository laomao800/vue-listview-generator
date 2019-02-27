<template>
  <div :class="$style.item">
    <div class="drag-handle" :class="$style.handle">
      <SvgIcon name="drag"/>
    </div>
    <div :class="$style.content">
      <slot/>
    </div>
    <div v-if="$slots.right" :class="$style.right">
      <slot name="right"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DragItem extends Vue {}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.item {
  display: flex;
  align-items: center;
  min-height: 28px;
  padding-right: 10px;
  margin-left: 20px;
  font-size: 14px;
  line-height: 120%;
  user-select: none;
  border-bottom: 1px solid @border-color-light-3;
  border-radius: 3px;
  transition: background 120ms ease-in;

  &:hover {
    background-color: #efefef;
    border-color: @border-color-light-2;

    .handle {
      opacity: 1;
    }
  }
}

.handle {
  width: 20px;
  height: 28px;
  margin-left: -20px;
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
  pointer-events: none;
  cursor: default;
}
</style>
