<template>
  <div :class="$style.wrap" class="editor-wrap">
    <Toolbar/>
    <div :class="$style.content">
      <ElForm :class="$style.main" label-width="140px" @submit.native.prevent>
        <ElTabs class="editor-tabs" v-model="activeTab" type="card">
          <ElTabPane label="数据源" name="dataSource">
            <DataSource/>
          </ElTabPane>
          <ElTabPane label="搜索栏" name="filterbar">tab2</ElTabPane>
          <ElTabPane label="内容" name="content">tab3</ElTabPane>
        </ElTabs>
      </ElForm>
      <div :class="$style.sidebar">
        <ElForm label-position="top" @submit.native.prevent>
          <Basic/>
        </ElForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Toolbar from '@/layout/Toolbar.vue'
import Basic from '@/layout/EditorPane/Basic.vue'
import DataSource from '@/layout/EditorPane/DataSource.vue'

@Component({
  components: {
    Toolbar,
    Basic,
    DataSource
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
  height: 100%;
  width: @sidebar-width;
  border-left: 1px solid @border-color;
  overflow: auto;
}
</style>

<style lang="less">
@import url('~@/style/theme.less');

.editor-wrap {
  .el-form-item {
    margin-bottom: @gap-size;
  }
}

.editor-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;

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
    }
  }

  > .el-tabs__content {
    flex: 1;
    overflow: auto;
  }
}
</style>
