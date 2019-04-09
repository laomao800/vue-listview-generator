<template>
  <div>
    <PaneTitle level="2" title="操作区域按钮" subtitle="filterButtons" inline style="margin-bottom:8px"/>
    <SortableList
      v-model="filterButtons"
      lock-axis="y"
      :transition-duration="120"
      :lock-to-container-edges="true"
      :use-drag-handle="true"
    >
      <SortableItem v-for="(item, index) in filterButtons" :index="index" :key="item.id">
        <FilterButtonPreview v-bind="item.data"/>
        <FilterButtonEditor
          ref="itemEditors"
          slot="right"
          :data="item.data"
          @delete="() => deleteItem(index)"
          @copy="newData => copyItem(newData, index)"
          @change="newVal => updateItem(index, newVal)"
        />
      </SortableItem>
    </SortableList>
    <AddItemHolder text="新建按钮" @click="createItem"/>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { FilterButton } from '@laomao800/vue-listview'
import { mapFields } from 'vuex-map-fields'
import EditableListBase from './EditableListBase'
import FilterButtonPreview from '@/layout/EditorPane/components/FilterButtonPreview.vue'
import FilterButtonEditor from '@/layout/EditorPane/components/FilterButtonEditor.vue'

const Module = namespace('editor/filterbar')

@Component({
  components: {
    FilterButtonPreview,
    FilterButtonEditor
  },
  computed: {
    ...mapFields('editor/filterbar', ['filterButtons'])
  }
})
export default class FilterButtons extends EditableListBase {
  @Module.Action('addFilterButton')
  public createHandler!: (payload?: {
    data: FilterButton
    insertAfter?: number
  }) => void

  @Module.Action('updateFilterButton')
  public updateHandler!: (payload: {
    updateIndex: number
    data: FilterButton
  }) => void

  @Module.Action('deleteFilterButton')
  public deleteHandler!: (payload: any) => void
}
</script>
