<template>
  <div>
    <ElRow :gutter="16">
      <ElCol :span="10">
        <PaneTitle level="2" title="表格列" subtitle="tableColumns" inline style="margin-bottom:8px" />
        <SortableList
          v-model="tableColumns"
          lock-axis="y"
          :transition-duration="120"
          :lock-to-container-edges="true"
          :use-drag-handle="true"
        >
          <SortableItem v-for="(item, index) in tableColumns" :index="index" :key="item.id">
            <TableColumnPreview v-bind="item.data" />
            <TableColumnEditor
              ref="itemEditors"
              slot="right"
              :data="item.data"
              @delete="() => deleteItem(index)"
              @copy="newData => copyItem(newData, index)"
              @change="newVal => updateItem(index, newVal)"
            />
          </SortableItem>
        </SortableList>
        <AddItemHolder text="新建列" @click="() => createItem()" />
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { TableColumn } from '@laomao800/vue-listview'
import { mapFields } from 'vuex-map-fields'
import EditableListMixin from './EditableListMixin'
import TableColumnEditor from '@/components/PopEditors/TableColumn/Editor.vue'
import TableColumnPreview from '@/components/PopEditors/TableColumn/Preview.vue'

const Module = namespace('project')

@Component({
  components: {
    TableColumnEditor,
    TableColumnPreview
  },
  computed: {
    ...mapFields('project', ['tableColumns'])
  }
})
export default class Content extends EditableListMixin {
  @Module.Action('addListItem')
  public createHandler!: () => void

  @Module.Action('updateListItem')
  public updateHandler!: () => void

  @Module.Action('deleteListItem')
  public deleteHandler!: () => void

  constructor() {
    super()
    this.stateField = 'tableColumns'
    this.defaultData = {
      label: '列名',
      prop: 'property_name'
    }
  }
}
</script>
