<template>
  <div>
    <PaneTitle level="2" title="搜索栏字段" subtitle="filterFields" inline style="margin-bottom:8px" />
    <SortableList
      v-model="filterFields"
      lock-axis="y"
      :transition-duration="120"
      :lock-to-container-edges="true"
      :use-drag-handle="true"
    >
      <SortableItem v-for="(item, index) in filterFields" :index="index" :key="item.id">
        <FilterFieldPreview v-bind="item.data" />
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
    <AddItemHolder text="新建字段" @click="() => createItem()" />
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { FilterField } from '@laomao800/vue-listview'
import { mapFields } from 'vuex-map-fields'
import EditableListMixin from './EditableListMixin'
import FilterFieldEditor from '@/components/PopEditors/FilterField/Editor.vue'
import FilterFieldPreview from '@/components/PopEditors/FilterField/Preview.vue'

const Module = namespace('project')

@Component({
  components: {
    FilterFieldEditor,
    FilterFieldPreview
  },
  computed: {
    ...mapFields('project', ['filterFields'])
  }
})
export default class FilterFields extends EditableListMixin {
  @Module.Action('addListItem')
  public createHandler!: (payload: any) => void

  @Module.Action('updateListItem')
  public updateHandler!: (payload: any) => void

  @Module.Action('deleteListItem')
  public deleteHandler!: (payload: any) => void

  constructor() {
    super()
    this.stateField = 'filterFields'
    this.defaultData = {
      type: 'text',
      label: '字段文本标签',
      model: 'param_name'
    }
  }
}
</script>
