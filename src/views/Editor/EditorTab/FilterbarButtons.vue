<template>
  <div>
    <div class="editor__header">
      <ElButton
        type="success"
        size="mini"
        icon="el-icon-plus"
        style="float:right"
        @click="dialogVisible = true"
        >添加操作按钮</ElButton
      >
      <div class="editor__title">
        操作按钮
        <small>filterButtons</small>
      </div>
    </div>

    <Draggable
      v-model="buttons"
      :options="{ handle: '.drag-handle', animation: 100 }"
      class="draggable-list filterbar-buttons-list"
    >
      <DragItem v-for="(item, index) in buttons" :key="index">
        <div class="config-content">
          <ElButton
            size="small"
            :type="item.type"
            :plain="item.plain"
            :icon="item.icon"
            >{{ item.text }}</ElButton
          >
        </div>
        <div slot="right">
          <ElButton type="text" icon="el-icon-edit" @click="edit(index)" />
          <ElButton type="text" icon="el-icon-delete" @click="remove(index)" />
        </div>
      </DragItem>
    </Draggable>

    <FilterButtonDialog
      :visible.sync="dialogVisible"
      :edit-model="editModel"
      @submit="save"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import FilterButtonDialog from '@/views/Editor/FilterButtonDialog/index.vue'
import { FilterButton } from '@laomao800/vue-listview'

@Component({
  components: {
    FilterButtonDialog
  }
})
export default class FilterbarButtons extends Vue {
  public dialogVisible = false
  public editIndex: number | null = null
  public model: {
    filterButtons: FilterButton[]
  } = {
    filterButtons: [
      {
        type: 'success',
        icon: 'el-icon-circle-plus-outline',
        text: '添加'
      },
      {
        type: 'danger',
        icon: 'el-icon-remove-outline',
        text: '删除'
      }
    ]
  }

  get buttons () {
    return this.model.filterButtons
  }
  set buttons (val) {
    this.model.filterButtons = val
  }
  get editModel () {
    return this.editIndex !== null
      ? this.model.filterButtons[this.editIndex]
      : null
  }

  @Watch('dialogVisible')
  onVisibleChanged (val: boolean) {
    if (val === false) {
      this.editIndex = null
    }
  }

  save (data: FilterButton) {
    if (this.editIndex) {
      // edit
      this.model.filterButtons.splice(this.editIndex, 1, data)
      this.editIndex = null
    } else {
      // add
      this.buttons.push(data)
    }
  }

  edit (index: number) {
    this.editIndex = index
    this.dialogVisible = true
  }

  remove (index: number) {
    this.buttons.splice(index, 1)
  }
}
</script>
