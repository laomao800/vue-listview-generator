<template>
  <div>
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

@Component
export default class Content extends Vue {
  public tableColumnConfigs = [
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
    },
    {
      label: '折扣时间',
      align: 'center',
      children: [
        { label: '折扣开始', prop: 'date', align: 'center' },
        { label: '折扣结束', prop: 'date', align: 'center' }
      ]
    },
    { __last: true }
  ]
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
