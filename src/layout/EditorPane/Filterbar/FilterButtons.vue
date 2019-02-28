<template>
  <div>
    <PaneTitle level="2" title="操作区域按钮" subtitle="filterButtons" inline style="margin-bottom:8px"/>
    <Draggable
      v-model="filterButtons"
      :options="{ handle: '.drag-handle', animation: 100 }"
      class="draggable-list filterbar-buttons-list"
    >
      <DragItem v-for="(item, index) in filterButtons" :key="item.id">
        <FilterButtonPreview v-bind="item.data"/>
        <FilterButtonEditor
          ref="buttonEditor"
          slot="right"
          :config="item.data"
          @change="newVal => updateConfig(index, newVal)"
        />
      </DragItem>
    </Draggable>
    <AddItemHolder @click="createButton"/>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { FilterButton } from '@laomao800/vue-listview'
import { formatJson } from '@/utils'
import { VModelState } from '@/store/helper'
import FilterButtonPreview from '@/components/FilterButtonPreview.vue'
import FilterButtonEditor from '@/components/FilterButtonEditor.vue'
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
export default class FilterbarButtons extends Vue {
  @BindState public filterButtons!: FilterButton[]
  @propModule.Action('addFilterButton') public addFilterButton: any
  @propModule.Action('updateFilterButton') public updateFilterButton: any

  updateConfig(index: number, newVal: FilterButton) {
    this.updateFilterButton({
      index,
      data: newVal
    })
  }

  createButton() {
    this.addFilterButton()
    const editors: any = this.$refs.buttonEditor
    setTimeout(() => {
      editors[editors.length - 1].show()
    })
  }
}
</script>
