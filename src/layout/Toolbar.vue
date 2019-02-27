<template>
  <div :class="$style.toolbar">toolbar</div>
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
  border-bottom: 1px solid @border-color;
}
</style>
