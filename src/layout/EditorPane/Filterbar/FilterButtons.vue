<template>
  <div>
    <PaneTitle level="2" title="操作区域按钮" subtitle="filterButtons" inline style="margin-bottom:8px"/>
    <Draggable v-model="filterButtons" :options="{ handle: '.drag-handle', animation: 100 }">
      <DragItem v-for="(item, index) in filterButtons" :key="item.id">
        <FilterButtonPreview v-bind="item.data"/>
        <FilterButtonEditor
          ref="itemEditors"
          slot="right"
          :config="item.data"
          :handle-delete="() => deleteItem(index)"
          @copy="newData => copyItem(newData, index)"
          @change="newVal => updateItem(index, newVal)"
        />
      </DragItem>
    </Draggable>
    <AddItemHolder text="新建按钮" @click="createItem"/>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { FilterButton } from '@laomao800/vue-listview'
import { State as PropState } from '@/store/modules/listviewProps'
import { VModelState } from '@/store/helper'
import EditableListBase from '@/layout/EditorPane/EditableListBase'
import FilterButtonPreview from '@/layout/EditorPane/components/FilterButtonPreview.vue'
import FilterButtonEditor from '@/layout/EditorPane/components/FilterButtonEditor.vue'

const BindState = VModelState('listviewProps')
const PropModule = namespace('listviewProps')

@Component({
  components: {
    FilterButtonPreview,
    FilterButtonEditor
  }
})
export default class FilterButtons extends EditableListBase {
  @BindState
  public filterButtons!: PropState['filterButtons']

  @PropModule.Action('addFilterButton')
  public createHandler!: (payload?: {
    data: FilterButton
    insertAfter?: number
  }) => void

  @PropModule.Action('updateFilterButton')
  public updateHandler!: (payload: {
    updateIndex: number
    data: FilterButton
  }) => void

  @PropModule.Action('deleteFilterButton')
  public deleteHandler!: (payload: any) => void
}
</script>
