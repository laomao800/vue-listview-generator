<template>
  <div :class="$style.wrap" class="editor-wrap">
    <div :class="$style.content">
      <div :class="$style.main">
        <ElForm label-width="140px" @submit.native.prevent style="height:100%">
          <ElTabs class="editor-tabs" v-model="activeTab" type="card">
            <ElTabPane label="数据源" name="dataSource">
              <DataSource/>
            </ElTabPane>
            <ElTabPane label="搜索栏" name="filterbar">
              <ElRow :gutter="16">
                <ElCol :span="8">
                  <FilterButtons/>
                </ElCol>
                <ElCol :span="10">
                  <FilterFields/>
                </ElCol>
              </ElRow>
            </ElTabPane>
            <ElTabPane label="内容" name="content">
              <Content/>
            </ElTabPane>
          </ElTabs>
        </ElForm>
      </div>
      <div :class="$style.sidebar">
        <ElForm label-position="top" @submit.native.prevent>
          <Basic/>
        </ElForm>
      </div>
    </div>
    <SelectOptionsEditor/>
    <AceEditorDialog/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Basic from '@/layout/EditorPane/Basic.vue'
import DataSource from '@/layout/EditorPane/DataSource.vue'
import FilterButtons from '@/layout/EditorPane/FilterButtons.vue'
import FilterFields from '@/layout/EditorPane/FilterFields.vue'
import Content from '@/layout/EditorPane/Content.vue'

@Component({
  components: {
    Basic,
    DataSource,
    FilterButtons,
    FilterFields,
    Content
  }
})
export default class EditorMain extends Vue {
  public activeTab = 'dataSource'
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
  position: relative;
  flex: 1;
}
.actionbar {
  position: absolute;
  top: 6px;
  right: 7px;
  z-index: 1;
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
