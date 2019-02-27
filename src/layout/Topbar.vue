<template>
  <div :class="$style.topbar">
    <div :class="$style.logo">Listview Editor</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Topbar extends Vue {}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.topbar {
  height: 50px;
  background-color: @color-primary;
  display: flex;
}
.logo {
  font-size: 20px;
  padding: 0 20px;
  color: @logo-text-color;
  display: flex;
  align-items: center;
}
</style>
