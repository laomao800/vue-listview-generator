<template>
  <div :class="$style.wrap">
    <Topbar/>
    <div :class="$style.content">
      <Sidebar :class="$style.sidebar"/>
      <EditorMain :class="$style.main"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Topbar from '@/layout/Topbar.vue'
import Sidebar from '@/layout/Sidebar.vue'
import EditorMain from '@/layout/EditorMain.vue'
import '@/style/common.less'
import '@/style/editor-common.less'
import '@/style/element-ui-overwrite.less'

@Component({
  components: {
    Topbar,
    Sidebar,
    EditorMain
  }
})
export default class App extends Vue {}
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
