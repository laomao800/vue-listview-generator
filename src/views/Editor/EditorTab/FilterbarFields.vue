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
        <div class="config-content">
          <div class="field-meta">
            <span>类型:</span>
            <i :class="getFieldTypeIcon(item.type)" />
            {{ item.type }}
          </div>
          <div class="field-meta">
            <span>文字标签:</span> {{ item.label }}
          </div>
          <div class="field-meta">
            <span>参数名称:</span> {{ item.model }}
          </div>
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
import FilterFieldDialog from '@/views/Editor/FilterFieldDialog/index.vue'
import OptionsEditList from '@/views/components/OptionsEditList.vue'
import { FilterField } from '@laomao800/vue-listview'

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
        type: 'text',
        model: 'text',
        label: '文本字段'
      },
      {
        type: 'select',
        model: 'select',
        label: '单选字段',
        options: [
          { label: '选项 1', value: 1 },
          { label: '选项 2', value: 2 },
          { label: '选项 3', value: 3 }
        ]
      },
      {
        type: 'multipleSelect',
        model: 'multipleSelect',
        label: '多选字段',
        options: [
          { label: '选项 1', value: 1 },
          { label: '选项 2', value: 2 },
          { label: '选项 3', value: 3 }
        ]
      },
      { type: 'date', model: 'date', label: '日期' },
      {
        type: 'dateRange',
        model: 'dateRange',
        label: '日期范围'
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
    return this.editIndex !== null
      ? this.model.filterFields[this.editIndex]
      : null
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
