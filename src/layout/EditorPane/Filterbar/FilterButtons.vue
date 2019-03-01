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
          :handle-delete="() => deleteButton(item)"
          @copy="newData => copyButton(newData, index)"
          @change="newVal => updateConfig(index, newVal)"
        />
      </DragItem>
    </Draggable>
    <AddItemHolder @click="createNewButton"/>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { FilterButton } from '@laomao800/vue-listview'
import { State as PropState } from '@/store/modules/listviewProps.ts'
import { formatJson } from '@/utils'
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
  },
  methods: {
    formatJson
  }
})
export default class FilterButtons extends Vue {
  @BindState
  public filterButtons!: PropState['filterButtons']

  @propModule.Action('addFilterButton')
  public addFilterButton!: (payload?: {
    data: FilterButton
    insert?: number
  }) => void

  @propModule.Action('updateFilterButton')
  public updateFilterButton!: (payload: {
    index: number
    data: FilterButton
  }) => void

  @propModule.Action('deleteFilterButton')
  public deleteFilterButton!: (payload: any) => void

  updateConfig(index: number, newVal: FilterButton) {
    this.updateFilterButton({
      index,
      data: newVal
    })
  }

  async createNewButton() {
    this.addFilterButton()
    await this.$nextTick()
    const editors: any = this.$refs.buttonEditor
    // 放于 setTimeout 内避免过快触发关闭弹出
    setTimeout(() => {
      const editor = editors[editors.length - 1]
      editor.show()
    })
  }

  copyButton(data: FilterButton, index: number) {
    this.addFilterButton({
      data,
      // 插入在被复制的数据之下
      insert: index + 1
    })
  }

  async deleteButton(data: any) {
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
