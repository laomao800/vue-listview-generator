<template functional>
  <div class="field-divider"/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FieldDivider extends Vue {}
</script>

<style lang="less" scoped>
@import url('~@/style/theme.less');

.field-divider {
  height: 1px;
  margin: 6px 0;
  overflow: hidden;
  background-color: @color-gray-light-3;
}
</style>
