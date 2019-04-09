<template>
  <div>
    <ElRow :gutter="16">
      <ElCol :span="10">
        <PaneTitle level="2" title="表格列" subtitle="tableColumns" inline style="margin-bottom:8px"/>
        <SortableList
          v-model="tableColumns"
          lock-axis="y"
          :transition-duration="120"
          :lock-to-container-edges="true"
          :use-drag-handle="true"
        >
          <SortableItem v-for="(item, index) in tableColumns" :index="index" :key="item.id">
            <TableColumnPreview v-bind="item.data"/>
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
        <AddItemHolder text="新建列" @click="createItem"/>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { TableColumn } from '@laomao800/vue-listview'
import { mapFields } from 'vuex-map-fields'
import EditableListBase from './EditableListBase'
import TableColumnPreview from '@/layout/EditorPane/components/TableColumnPreview.vue'
import TableColumnEditor from '@/layout/EditorPane/components/TableColumnEditor.vue'

const Module = namespace('editor/content')

@Component({
  components: {
    TableColumnPreview,
    TableColumnEditor
  },
  computed: {
    ...mapFields('editor/content', ['tableColumns'])
  }
})
export default class Content extends EditableListBase {
  @Module.Action('addTableColumn')
  public createHandler!: (payload?: {
    data: TableColumn
    insertAfter?: number
  }) => void

  @Module.Action('updateTableColumn')
  public updateHandler!: (payload: {
    updateIndex: number
    data: TableColumn
  }) => void

  @Module.Action('deleteTableColumn')
  public deleteHandler!: (payload: any) => void
}
</script>
