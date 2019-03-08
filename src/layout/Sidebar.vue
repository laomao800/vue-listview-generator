<template>
  <div :class="$style.sidebar">
    <pre style="height:100%;overflow:auto">
      {{ JSON.stringify($store.state.listviewProps.filterFields, null, 2)}}
    </pre>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Sidebar extends Vue {}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');
</style>
