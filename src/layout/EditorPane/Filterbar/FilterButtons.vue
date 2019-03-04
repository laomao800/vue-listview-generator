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
          :handle-delete="() => deleteItem(item)"
          @copy="newData => copyItem(newData, index)"
          @change="newVal => updateConfig(index, newVal)"
        />
      </DragItem>
    </Draggable>
    <AddItemHolder text="新建按钮" @click="createNewItem"/>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { FilterButton } from '@laomao800/vue-listview'
import { State as PropState } from '@/store/modules/listviewProps.ts'
import { VModelState } from '@/store/helper'
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
export default class FilterButtons extends Vue {
  @BindState
  public filterButtons!: PropState['filterButtons']

  @propModule.Action('addFilterButton')
  public addFilterButton!: (payload?: {
    data: FilterButton
    insertAfter?: number
  }) => void

  @propModule.Action('updateFilterButton')
  public updateFilterButton!: (payload: {
    updateIndex: number
    data: FilterButton
  }) => void

  @propModule.Action('deleteFilterButton')
  public deleteFilterButton!: (payload: any) => void

  updateConfig(index: number, newVal: FilterButton) {
    this.updateFilterButton({
      updateIndex: index,
      data: newVal
    })
  }

  async createNewItem() {
    this.addFilterButton()
    await this.$nextTick()
    const editors: any = this.$refs.buttonEditor
    // 放于 setTimeout 内避免过快触发关闭弹出
    setTimeout(() => {
      const editor = editors[editors.length - 1]
      editor.show()
    })
  }

  copyItem(data: FilterButton, insertAfter: number) {
    this.addFilterButton({
      data,
      insertAfter
    })
  }

  async deleteItem(data: any) {
    try {
      await this.$confirm('确认删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      this.deleteFilterButton(data)
    } catch (e) {}
  }
}
</script>
