<template>
  <div>
    <PaneTitle level="2" title="搜索栏字段" subtitle="filterFields" inline style="margin-bottom:8px"/>
    <Draggable v-model="filterFields" :options="{ handle: '.drag-handle', animation: 100 }">
      <DragItem v-for="(item, index) in filterFields" :key="item.id">
        <FilterFieldPreview v-bind="item.data"/>
        <FilterFieldEditor
          ref="itemEditors"
          slot="right"
          :data="item.data"
          @delete="() => deleteItem(index)"
          @copy="newData => copyItem(newData, index)"
          @change="newVal => updateItem(index, newVal)"
        />
      </DragItem>
    </Draggable>
    <AddItemHolder text="新建字段" @click="createItem"/>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { FilterField } from '@laomao800/vue-listview'
import { State as PropState } from '@/store/modules/listviewProps'
import { VModelState } from '@/store/helper'
import EditableListBase from './EditableListBase'
import FilterFieldPreview from '@/layout/EditorPane/components/FilterFieldPreview.vue'
import FilterFieldEditor from '@/layout/EditorPane/components/FilterFieldEditor.vue'

const BindState: any = VModelState('listviewProps')
const PropModule = namespace('listviewProps')

@Component({
  components: {
    FilterFieldPreview,
    FilterFieldEditor
  }
})
export default class FilterFields extends EditableListBase {
  @BindState
  public filterFields!: PropState['filterFields']

  @PropModule.Action('addFilterField')
  public createHandler!: (payload?: {
    data: FilterField
    insertAfter?: number
  }) => void

  @PropModule.Action('updateFilterField')
  public updateHandler!: (payload: {
    updateIndex: number
    data: FilterField
  }) => void

  @PropModule.Action('deleteFilterField')
  public deleteHandler!: (deleteIndex: number) => void
}
</script>
