<template>
  <div :class="$style.wrap">
    <Topbar />
    <div :class="$style.content">
      <Sidebar :class="$style.sidebar" />
      <MainContent :class="$style.main" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Topbar from '@/layout/Topbar.vue'
import Sidebar from '@/layout/Sidebar.vue'
import MainContent from '@/layout/MainContent.vue'

@Component({
  components: {
    Topbar,
    Sidebar,
    MainContent
  }
})
export default class Editor extends Vue {}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.content {
  display: flex;
  flex: 1;
  overflow: hidden;
  background: @main-background-color;
}
.sidebar {
  width: @sidebar-width;
  background: @sidebar-background-color;
  border-right: 1px solid @border-color;
}
.main {
  flex: 1;
}
</style>
