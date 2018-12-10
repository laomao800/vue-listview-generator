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
        添加搜索字段
      </ElButton>
      <div class="editor__title">
        搜索字段
        <small>filterFields</small>
      </div>
    </div>

    <Draggable
      v-model="fields"
      :options="{ handle: '.drag-handle', animation: 100 }"
      class="draggable-list filterbar-fields-list"
    >
      <DragItem
        v-for="(item, index) in fields"
        :key="item.key"
      >
        <div
          class="config-content"
          :class="{[`config-content--${item.type}`]: item.type}"
        >
          <template v-if="item.type === 'object'">
            <div class="field-meta">
              <span>类型:</span>
              <i :class="getFieldTypeIcon(item.data.type)" />
              {{ item.data.type }}
            </div>
            <div class="field-meta">
              <span>文字标签:</span> {{ item.data.label }}
            </div>
            <div class="field-meta">
              <span>参数名称:</span> {{ item.data.model }}
            </div>
          </template>
          <template v-else-if="item.type === 'jsx'">
            <div class="jsx-placeholder">
              自定义 (JSX)
            </div>
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

    <FilterFieldDialog
      :visible.sync="dialogVisible"
      :edit-model="editModel"
      @submit="save"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import FilterFieldDialog from '@/views/editor/filter-field-dialog/index.vue'
import OptionsEditList from '@/views/components/options-edit-list.vue'

interface FilterField {
  key: string
  type: 'object' | 'jsx'
  data: object | string
}

@Component({
  components: {
    OptionsEditList,
    FilterFieldDialog
  }
})
export default class FilterbarFields extends Vue {
  public optionsData = []
  public dialogVisible = false
  public editIndex: number | null = null
  public model: {
    filterFields: FilterField[]
  } = {
    filterFields: [
      {
        key: 'f1',
        type: 'object',
        data: { type: 'text', model: 'text', label: '文本框' }
      },
      {
        key: 'f2',
        type: 'object',
        data: { type: 'date', model: 'date', label: '日期' }
      }
    ]
  }

  get fields() {
    return this.model.filterFields
  }
  set fields(val) {
    this.model.filterFields = val
  }
  get editModel() {
    return this.editIndex ? this.model.filterFields[this.editIndex].data : null
  }

  @Watch('dialogVisible')
  onVisibleChanged(val: boolean) {
    if (!val) {
      this.editIndex = null
    }
  }

  save(data: FilterField) {
    if (this.editIndex) {
      // edit
      this.model.filterFields.splice(this.editIndex, 1, data)
      this.editIndex = null
    } else {
      // add
      this.fields.push(data)
    }
  }

  edit(index: number) {
    this.editIndex = index
    this.dialogVisible = true
  }

  remove(index: number) {
    this.fields.splice(index, 1)
  }

  getFieldTypeIcon(type: string) {
    switch (type) {
      case 'text':
        return 'el-icon-edit'

      case 'select':
      case 'multipleSelect':
      case 'cascader':
        return 'el-icon-tickets'

      case 'date':
      case 'dateRange':
      case 'dateTime':
      case 'dateTimeRange':
        return 'el-icon-date'

      case 'timeSelect':
      case 'timePicker':
      case 'timePickerRange':
        return 'el-icon-time'
    }
  }
}
</script>
