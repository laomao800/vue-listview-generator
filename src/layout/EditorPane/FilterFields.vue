<template>
  <div>
    <PaneTitle level="2" title="搜索栏字段" subtitle="filterFields" inline style="margin-bottom:8px"/>
    <SortableList
      v-model="filterFields"
      lock-axis="y"
      :transition-duration="120"
      :lock-to-container-edges="true"
      :use-drag-handle="true"
    >
      <SortableItem v-for="(item, index) in filterFields" :index="index" :key="item.id">
        <FilterFieldPreview v-bind="item.data"/>
        <FilterFieldEditor
          ref="itemEditors"
          slot="right"
          :data="item.data"
          @delete="() => deleteItem(index)"
          @copy="newData => copyItem(newData, index)"
          @change="newVal => updateItem(index, newVal)"
        />
      </SortableItem>
    </SortableList>
    <AddItemHolder text="新建字段" @click="createItem"/>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { FilterField } from '@laomao800/vue-listview'
import { mapFields } from 'vuex-map-fields'
import EditableListBase from './EditableListBase'
import FilterFieldPreview from '@/layout/EditorPane/components/FilterFieldPreview.vue'
import FilterFieldEditor from '@/layout/EditorPane/components/FilterFieldEditor.vue'

const Module = namespace('editor/filterbar')

@Component({
  components: {
    FilterFieldPreview,
    FilterFieldEditor
  },
  computed: {
    ...mapFields('editor/filterbar', ['filterFields'])
  }
})
export default class FilterFields extends EditableListBase {
  @Module.Action('addFilterField')
  public createHandler!: (payload?: {
    data: FilterField
    insertAfter?: number
  }) => void

  @Module.Action('updateFilterField')
  public updateHandler!: (payload: {
    updateIndex: number
    data: FilterField
  }) => void

  @Module.Action('deleteFilterField')
  public deleteHandler!: (deleteIndex: number) => void
}
</script>
