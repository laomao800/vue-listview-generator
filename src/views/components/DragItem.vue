<template>
  <div class="drag-item">
    <div class="drag-handle" />
    <div class="content">
      <slot />
    </div>
    <div v-if="$slots.right" class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DragItem extends Vue {}
</script>

<style lang="less">
.drag-item {
  display: flex;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #e9edf4;

  .drag-handle {
    border-right: 1px solid #e9edf4;
  }

  .content {
    flex: 1;
    padding: 5px 10px;
    overflow: hidden;
    box-shadow: inset #e9edf4 0 0 10px;
    cursor: default;
  }

  .right {
    padding: 0 10px;
  }
}
</style>
