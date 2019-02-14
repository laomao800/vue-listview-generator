<template>
  <div :class="$style.wrap">
    <Toolbar/>
    <div :class="$style.content">
      <ElForm :class="$style.main" label-width="120px" @submit.native.prevent>
        <ElTabs class="editor-tabs" v-model="activeTab" type="card">
          <ElTabPane label="数据源" name="dataSource">
            <PaneDataSource/>
          </ElTabPane>
          <ElTabPane label="搜索栏" name="filterbar">tab2</ElTabPane>
          <ElTabPane label="内容" name="content">tab3</ElTabPane>
        </ElTabs>
      </ElForm>
      <div :class="$style.sidebar">sidebar</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Toolbar from '@/layout/Toolbar.vue'
import PaneDataSource from '@/layout/EditorPane/DataSource.vue'

@Component({
  components: {
    Toolbar,
    PaneDataSource
  }
})
export default class EditorMain extends Vue {
  public activeTab = 'dataSource'
  public dataSourceType = 'default'
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

<style lang="less">
@import url('~@/style/theme.less');

.editor-tabs {
  > .el-tabs__header {
    margin: 0;
    border-bottom: 1px solid @border-color-light;

    .el-tabs__nav {
      border-radius: 0;
      border-left: none;
      border-top: 0;
    }

    .el-tabs__item.is-active {
      border-bottom-color: @main-background-color;
      // background-color: darken(@main-background-color, 2);
    }
  }
}
</style>
