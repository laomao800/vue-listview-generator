<template>
  <div :class="$style.wrap" class="editor-wrap">
    <!-- <Toolbar/> -->
    <div :class="$style.content">
      <div :class="$style.main">
        <div :class="$style.actionbar">
          <ElButtonGroup>
            <ElButton
              :class="$style.act"
              size="mini"
              type="success"
              plain
              icon="el-icon-picture-outline"
            >预览</ElButton>
            <ElButton
              :class="$style.act"
              size="mini"
              icon="el-icon-document"
              @click="checkCurConfig"
            >查看配置</ElButton>
            <ElButton :class="$style.act" size="mini" icon="el-icon-download">导出配置</ElButton>
          </ElButtonGroup>
        </div>
        <ElForm label-width="140px" @submit.native.prevent>
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
import Toolbar from '@/layout/Toolbar.vue'
import Basic from '@/layout/EditorPane/Basic.vue'
import DataSource from '@/layout/EditorPane/DataSource.vue'
import FilterButtons from '@/layout/EditorPane/FilterButtons.vue'
import FilterFields from '@/layout/EditorPane/FilterFields.vue'
import Content from '@/layout/EditorPane/Content.vue'
import { JSONfn } from '@/utils'

@Component({
  components: {
    Toolbar,
    Basic,
    DataSource,
    FilterButtons,
    FilterFields,
    Content
  }
})
export default class EditorMain extends Vue {
  public activeTab = 'dataSource'

  checkCurConfig() {
    this.$store.dispatch('aceEditorDialog/show', {
      content:
        'const listviewProps = ' +
        JSONfn.stringify(this.$store.getters['listviewProps/result'], 2)
          .replace(/"function/g, 'function')
          .replace(/\}"/g, '}')
          .replace(/\\n/g, '\n'),
      width: 800,
      title: '查看配置'
    })
  }
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
