<template>
  <!-- eslint-disable vue/attributes-order vue/max-attributes-per-line -->
  <div class="listview-editor">
    <div style="padding-bottom:20px;">
      <el-button
        type="primary"
        @click="doPreview"
      >预览效果</el-button>
      <el-button
        type="primary"
        @click="getPreview"
      >查看配置</el-button>

      <el-dialog
        title="预览"
        class="preview-dialog"
        :visible.sync="previewVisible"
        :fullscreen="true"
        @opened="triggerResize"
      >
        <listview
          v-if="previewVisible"
          v-bind="previewProps"
        />
      </el-dialog>

      <el-dialog
        title="配置"
        :visible.sync="previewPropsVisible"
      >
        <AceEditor
          :readonly="true"
          ref="jsxEditor"
          lang="json"
          :content="JSON.stringify(previewProps, null, 2)"
        />
      </el-dialog>
    </div>
    <div class="editor__config">
      <ElForm
        ref="configForm"
        size="medium"
        label-width="120px"
        @submit.native.prevent
      >
        <ElTabs
          v-model="configActiveTab"
          type="card"
        >
          <ElTabPane
            label="数据源配置"
            name="dataSource"
          >
            <EditorTabDataSource ref="config1" />
          </ElTabPane>

          <ElTabPane
            label="基础配置"
            name="basic"
          >
            <EditorTabBasic ref="config2" />
          </ElTabPane>

          <ElTabPane
            label="搜索栏"
            name="filterbar"
          >
            <EditorTabFilterbar ref="config3" />
          </ElTabPane>

          <ElTabPane
            label="内容"
            name="content"
          >
            <EditorTabContent ref="config4" />
          </ElTabPane>
        </ElTabs>
      </ElForm>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue } from 'vue-property-decorator'
import Listview from '@laomao800/vue-listview'
import EditorTabDataSource from '@/views/Editor/EditorTab/DataSource.vue'
import EditorTabBasic from '@/views/Editor/EditorTab/Basic.vue'
import EditorTabFilterbar from '@/views/Editor/EditorTab/Filterbar.vue'
import EditorTabContent from '@/views/Editor/EditorTab/Content.vue'
import './style.less'

@Component({
  components: {
    Listview,
    EditorTabDataSource,
    EditorTabBasic,
    EditorTabFilterbar,
    EditorTabContent
  }
})
export default class ListviewEditor extends Vue {
  public $refs: any
  public configActiveTab = 'dataSource'
  public previewProps = {}
  public previewVisible = false
  public previewPropsVisible = false

  getProps() {
    return {
      ..._.cloneDeep(this.$refs.config1.model),
      ..._.cloneDeep(this.$refs.config2.model),
      ..._.cloneDeep(this.$refs.config3.model),
      ..._.cloneDeep(this.$refs.config4.model)
    }
  }

  doPreview() {
    this.previewProps = this.getProps()
    this.previewVisible = true
  }

  getPreview() {
    this.previewProps = this.getProps()
    this.previewPropsVisible = true
  }

  triggerResize() {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, false)
    document.dispatchEvent(event)
  }
}
</script>

<style>
.preview-dialog .el-dialog__header {
  padding: 20px;
}
.preview-dialog .el-dialog__body {
  padding: 0;
}
</style>
