<template>
  <div :class="$style.wrap" class="editor-wrap">
    <Toolbar/>
    <div :class="$style.content">
      <ElForm :class="$style.main" label-width="140px" @submit.native.prevent>
        <ElTabs class="editor-tabs" v-model="activeTab" type="card">
          <ElTabPane label="数据源" name="dataSource">
            <DataSource/>
          </ElTabPane>
          <ElTabPane label="搜索栏" name="filterbar">
            <Filterbar/>
          </ElTabPane>
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
import { Vue, Component } from 'vue-property-decorator'
import Toolbar from '@/layout/Toolbar.vue'
import Basic from '@/layout/EditorPane/Basic.vue'
import DataSource from '@/layout/EditorPane/DataSource.vue'
import Filterbar from '@/layout/EditorPane/Filterbar/index.vue'

@Component({
  components: {
    Toolbar,
    Basic,
    DataSource,
    Filterbar
  }
})
export default class EditorMain extends Vue {
  public activeTab = 'filterbar'
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
  width: 360px;
  height: 100%;
  overflow: auto;
  border-left: 1px solid @border-color;
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
  display: flex;
  flex-direction: column;
  height: 100%;

  > .el-tabs__header {
    margin: 0;
    border-bottom: 1px solid @color-gray-light-1;

    .el-tabs__nav {
      border-top: 0;
      border-left: none;
      border-radius: 0;
    }

    .el-tabs__item.is-active {
      border-bottom-color: @main-background-color;
    }
  }

  > .el-tabs__content {
    flex: 1;
    padding: @gap-size;
    overflow: auto;
  }
}
</style>
