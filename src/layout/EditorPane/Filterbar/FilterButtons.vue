<template>
  <div>
    <PaneTitle level="2" title="操作区域按钮" subtitle="filterButtons" inline style="margin-bottom:8px"/>
    <Draggable v-model="filterButtons" :options="{ handle: '.drag-handle', animation: 100 }">
      <DragItem v-for="(item, index) in filterButtons" :key="item.id">
        <FilterButtonPreview v-bind="item.data"/>
        <FilterButtonEditor
          ref="buttonEditor"
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
import { State as PropState } from '@/store/modules/listviewProps.ts'
import { VModelState } from '@/store/helper'
import EditableListBase from './EditableListBase'
import FilterButtonPreview from './components/FilterButtonPreview.vue'
import FilterButtonEditor from './components/FilterButtonEditor.vue'
import AddItemHolder from '@/components/AddItemHolder.vue'

const propModule = namespace('listviewProps')
const BindState = VModelState('listviewProps')

@Component({
  components: {
    FilterButtonPreview,
    FilterButtonEditor,
    AddItemHolder
  }
})
export default class FilterButtons extends EditableListBase {
  @BindState
  public filterButtons!: PropState['filterButtons']

  @propModule.Action('addFilterButton')
  public createHandler!: (payload?: {
    data: FilterButton
    insertAfter?: number
  }) => void

  @propModule.Action('updateFilterButton')
  public updateHandler!: (payload: {
    updateIndex: number
    data: FilterButton
  }) => void

  @propModule.Action('deleteFilterButton')
  public deleteHandler!: (payload: any) => void
}
</script>
