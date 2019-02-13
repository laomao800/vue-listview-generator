<template>
  <div :class="$style.wrap">
    <Toolbar/>
    <div :class="$style.content">
      <div :class="$style.main">
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane label="tab1">tab1</el-tab-pane>
          <el-tab-pane label="tab2">tab2</el-tab-pane>
          <el-tab-pane label="tab3">tab3</el-tab-pane>
        </el-tabs>
      </div>
      <div :class="$style.sidebar">sidebar</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Toolbar from '@/layout/Toolbar.vue'

@Component({
  components: {
    Toolbar
  }
})
export default class EditorMain extends Vue {
  public activeTab = ''
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.wrap {
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  flex: 1;
}
.main {
  flex: 1;
}
.sidebar {
  width: @sidebar-width;
  border-left: 1px solid @border-color;
}
</style>
