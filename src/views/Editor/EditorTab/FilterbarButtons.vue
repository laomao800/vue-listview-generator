<template>
  <div>
    <div class="editor__header">
      <ElButton
        type="success"
        size="mini"
        icon="el-icon-plus"
        style="float:right"
        @click="dialogVisible = true"
      >
        添加操作按钮
      </ElButton>
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
      <DragItem
        v-for="(item, index) in buttons"
        :key="item.key"
      >
        <div
          class="config-content"
          :class="{[`config-content--${item.type}`]: item.type}"
        >
          <template v-if="item.type === 'object'">
            <ElButton
              size="small"
              :type="item.data.type"
              :plain="item.data.plain"
              :icon="item.data.icon"
            >
              {{ item.data.text }}
            </ElButton>
          </template>
          <template v-else-if="item.type === 'jsx'">
            <ElPopover
              placement="right"
              trigger="hover"
            >
              <div
                slot="reference"
                class="jsx-placeholder"
              >
                自定义 (JSX)
              </div>
              <pre style="margin:0;font-size:12px;">{{ item.data }}</pre>
            </ElPopover>
          </template>
        </div>
        <div slot="right">
          <ElButton
            type="text"
            icon="el-icon-edit"
            @click="edit(index)"
          />
          <ElButton
            type="text"
            icon="el-icon-delete"
            @click="remove(index)"
          />
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

interface FilterButton {
  key: string
  type: 'object' | 'jsx'
  data: object | string
}

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
        key: 'b1',
        type: 'object',
        data: { type: 'default', text: 'default' }
      },
      {
        key: 'b2',
        type: 'object',
        data: { type: 'primary', icon: 'el-icon-edit', text: 'primary' }
      },
      {
        key: 'b3',
        type: 'object',
        data: { type: 'success', icon: 'el-icon-check', text: 'success' }
      },
      {
        key: 'b4',
        type: 'object',
        data: { type: 'info', icon: 'el-icon-message', text: 'info' }
      },
      {
        key: 'b5',
        type: 'object',
        data: { type: 'warning', icon: 'el-icon-star-off', text: 'warning' }
      },
      {
        key: 'b6',
        type: 'object',
        data: { type: 'danger', icon: 'el-icon-delete', text: 'danger' }
        // },
        // {
        //   key: 'b7',
        //   type: 'jsx',
        //   data: [
        //     '<div>',
        //     '  <el-button type="primary" size="small">按钮</el-button>',
        //     '  <el-button type="primary" size="small">按钮</el-button>',
        //     '</div>'
        //   ].join('\n')
      }
    ]
  }

  get buttons() {
    return this.model.filterButtons
  }
  set buttons(val) {
    this.model.filterButtons = val
  }
  get editModel() {
    return this.editIndex ? this.model.filterButtons[this.editIndex].data : null
  }

  @Watch('dialogVisible')
  onVisibleChanged(val: boolean) {
    if (val === false) {
      this.editIndex = null
    }
  }

  save(data: FilterButton) {
    if (this.editIndex) {
      // edit
      this.model.filterButtons.splice(this.editIndex, 1, data)
      this.editIndex = null
    } else {
      // add
      this.buttons.push(data)
    }
  }

  edit(index: number) {
    this.editIndex = index
    this.dialogVisible = true
  }

  remove(index: number) {
    this.buttons.splice(index, 1)
  }
}
</script>
