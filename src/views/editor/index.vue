<template>
  <!-- eslint-disable vue/attributes-order vue/max-attributes-per-line -->
  <div class="listview-editor">
    <div class="editor__config">
      <el-form
        ref="configForm"
        :model="configModel"
        size="medium"
        label-width="120px"
        @submit.native.prevent
      >
        <el-tabs
          v-model="configActiveTab"
          type="card"
        >
          <el-tab-pane
            label="数据源配置"
            name="dataSource"
          >
            <editor-tab-data-source />
          </el-tab-pane>

          <el-tab-pane
            label="基础配置"
            name="basic"
          >
            <editor-tab-basic />
          </el-tab-pane>

          <el-tab-pane
            label="搜索栏"
            name="filterbar"
          >
            <editor-tab-filterbar />
          </el-tab-pane>

          <el-tab-pane
            label="内容"
            name="content"
          >
            <editor-tab-content :model="configModel" />
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditorTabDataSource from '@/views/editor/editor-tab/data-source.vue'
import EditorTabBasic from '@/views/editor/editor-tab/basic.vue'
import EditorTabFilterbar from '@/views/editor/editor-tab/filterbar.vue'
import EditorTabContent from '@/views/editor/editor-tab/content.vue'
import './style.less'

@Component({
  components: {
    EditorTabDataSource,
    EditorTabBasic,
    EditorTabFilterbar,
    EditorTabContent
  }
})
export default class ListviewEditor extends Vue {
  public configActiveTab = 'content'
  public configModel = {}
}
</script>
