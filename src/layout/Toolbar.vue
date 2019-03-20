<template>
  <div :class="$style.toolbar">
    <div :class="$style.act">预览</div>
    <div :class="$style.act">查看配置</div>
    <div :class="$style.act">导出配置</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Toolbar extends Vue {}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.toolbar {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid @border-color;
}
.act {
  float: left;
  border-right: 1px solid @border-color;
}
</style>
