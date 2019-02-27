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
  line-height: 120%;
  user-select: none;
  min-height: 28px;
  font-size: 14px;
  border-radius: 3px;
  margin-left: 20px;
  padding-right: 10px;
  border-bottom: 1px solid @border-color-light-3;
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
  margin-left: -20px;
  width: 20px;
  height: 28px;
  line-height: 28px;
  pointer-events: auto;
  cursor: move;
  cursor: -webkit-grab;
  color: #666;
  font-size: 20px;
  border-radius: 3px;
}

.content {
  flex: 1;
  overflow: hidden;
  cursor: default;
  pointer-events: none;
}

.right {
}
</style>
