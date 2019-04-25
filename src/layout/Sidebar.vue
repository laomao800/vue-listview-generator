<template>
  <div :class="$style.sidebar">sidebar</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Sidebar extends Vue {}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.sidebar {
  display: none;
}
</style>
