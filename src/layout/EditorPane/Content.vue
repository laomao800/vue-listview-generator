<template>
  <div>
    <ElRow :gutter="16">
      <ElCol :span="10">
        <PaneTitle level="2" title="表格列" subtitle="tableColumns" inline style="margin-bottom:8px"/>
        <Draggable v-model="tableColumns" :options="{ handle: '.drag-handle', animation: 100 }">
          <DragItem v-for="(item, index) in tableColumns" :key="item.id">
            <TableColumnPreview v-bind="item.data"/>
            <TableColumnEditor
              ref="itemEditors"
              slot="right"
              :data="item.data"
              :handle-delete="() => deleteItem(index)"
              @copy="newData => copyItem(newData, index)"
              @change="newVal => updateItem(index, newVal)"
            />
          </DragItem>
        </Draggable>
        <AddItemHolder text="新建列" @click="createItem"/>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { TableColumn } from '@laomao800/vue-listview'
import { State as PropState } from '@/store/modules/listviewProps'
import { VModelState } from '@/store/helper'
import EditableListBase from './EditableListBase'
import TableColumnPreview from '@/layout/EditorPane/components/TableColumnPreview.vue'
import TableColumnEditor from '@/layout/EditorPane/components/TableColumnEditor.vue'

const BindState = VModelState('listviewProps')
const PropModule = namespace('listviewProps')

@Component({
  components: {
    TableColumnPreview,
    TableColumnEditor
  }
})
export default class Content extends EditableListBase {
  @BindState
  public tableColumns!: PropState['tableColumns']

  @PropModule.Action('addTableColumn')
  public createHandler!: (payload?: {
    data: TableColumn
    insertAfter?: number
  }) => void

  @PropModule.Action('updateTableColumn')
  public updateHandler!: (payload: {
    updateIndex: number
    data: TableColumn
  }) => void

  @PropModule.Action('deleteTableColumn')
  public deleteHandler!: (payload: any) => void
}
</script>
