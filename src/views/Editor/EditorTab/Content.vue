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
        添加列
      </ElButton>
      <div class="editor__title">
        表格列
        <small>tableColumns</small>
      </div>
    </div>

    <Draggable
      v-model="fields"
      :options="{ handle: '.drag-handle', animation: 100 }"
      class="draggable-list filterbar-fields-list"
    >
      <DragItem
        v-for="(item, index) in columns"
        :key="item.key"
      >
        {{ index }}
        <div
          v-if="false"
          class="config-content"
          :class="{[`config-content--${item.type}`]: item.type}"
        >
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

    <TableColumnDialog
      :visible.sync="dialogVisible"
      :edit-model="editModel"
      @submit="save"
    />
    <!-- <div class="demo">
      {
        label: '自定义标签',
        prop: 'sku',
        width: 100,
        align: 'center',
        fixed: true
      },
      {
        label: '产品名称',
        prop: 'name',
        width: 200,
        align: 'center',
        fixed: true
      },
      {
        label: '折扣率',
        align: 'center',
        formatter: (row, column, cellValue, index) => row.discount.toFixed(2)
      },
      {
        label: '折扣时间',
        align: 'center',
        children: [
          { label: '折扣开始', prop: 'date', align: 'center' },
          { label: '折扣结束', prop: 'date', align: 'center' }
        ]
      },
      {
        label: '是否启用',
        align: 'center',
        render: prop => {
          if (prop.row.enable) {
            return <div style="color:#67c23a">启用</div>
          } else {
            return <div style="color:#f56c6c">禁用</div>
          }
        }
      }
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TableColumn } from 'element-ui/types/table-column'

@Component
export default class Content extends Vue {
  public optionsData = []
  public dialogVisible = false
  public editIndex: number | null = null
  public model: {
    columns: any
  } = {
    columns: [
      {
        id: 1,
        label: '自定义标签',
        prop: 'sku',
        width: 100,
        align: 'center',
        fixed: true
      },
      {
        id: 2,
        label: '产品名称',
        prop: 'name',
        width: 200,
        align: 'center',
        fixed: true
      }
      // {
      //   label: '折扣时间',
      //   align: 'center',
      //   children: [
      //     { label: '折扣开始', prop: 'date', align: 'center' },
      //     { label: '折扣结束', prop: 'date', align: 'center' }
      //   ]
      // },
      // { __last: true }
    ]
  }

  get columns() {
    return this.model.columns
  }

  get editModel() {
    return this.editIndex ? this.model.columns[this.editIndex].data : null
  }
}
</script>

<style lang="less">
.column-nodes {
  .el-tree-node__content {
    background: #efefef;
    padding-bottom: 5px;
    height: auto;
    cursor: default;
  }
  .el-input {
    width: 150px;
  }
}
</style>
