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
  display: flex;
  height: 50px;
  background-color: @topbar-background-color;
  border-bottom: 1px solid darken(@topbar-background-color, 10);
}
.logo {
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 20px;
  color: @logo-text-color;
}
</style>
