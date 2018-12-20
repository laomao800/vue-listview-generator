<template>
  <!-- eslint-disable vue/attributes-order vue/max-attributes-per-line -->
  <div class="listview-editor">
    <div class="editor__config">
      <ElForm
        ref="configForm"
        :model="configModel"
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
            <EditorTabDataSource />
          </ElTabPane>

          <ElTabPane
            label="基础配置"
            name="basic"
          >
            <EditorTabBasic />
          </ElTabPane>

          <ElTabPane
            label="搜索栏"
            name="filterbar"
          >
            <EditorTabFilterbar />
          </ElTabPane>

          <ElTabPane
            label="内容"
            name="content"
          >
            <EditorTabContent :model="configModel" />
          </ElTabPane>
        </ElTabs>
      </ElForm>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditorTabDataSource from '@/views/Editor/EditorTab/DataSource.vue'
import EditorTabBasic from '@/views/Editor/EditorTab/Basic.vue'
import EditorTabFilterbar from '@/views/Editor/EditorTab/Filterbar.vue'
import EditorTabContent from '@/views/Editor/EditorTab/Content.vue'
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
