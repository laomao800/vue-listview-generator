<template>
  <div :class="$style.wrap">
    <div class="pane__header" style="margin-bottom:5px">
      <span class="pane__title">顶部通栏配置</span>
    </div>

    <ElFormItem>
      <div slot="label">
        列表标题
        <span class="paramtips">headerTitle</span>
      </div>
      <ElInput v-model="headerTitle"/>
      <div class="formtips">显示于顶部面包屑左侧的列表标题</div>
    </ElFormItem>

    <ElFormItem>
      <div slot="label">
        面包屑
        <span class="paramtips">headerNav</span>
      </div>
      <ElTag
        v-for="(nav, index) in headerNav"
        :key="index"
        closable
        :disable-transitions="false"
        style="margin-right:10px"
        @close="removeHeaderNav(index)"
      >{{ nav.text }}</ElTag>
      <ElInput
        v-if="navInputVisible"
        ref="navInput"
        v-model.trim="navText"
        size="small"
        style="width:160px;height:32px;"
        maxlength="16"
        @keyup.esc.native="
          navText = ''
          navInputVisible = false
        "
        @keyup.enter.native="addHeaderNav"
        @blur="addHeaderNav"
      />
      <ElButton v-else size="mini" @click="showNavInput">+ 新增子项</ElButton>
      <div class="formtips">
        面包屑支持
        <code>to</code> 属性设置路由跳转对象，可在生成后的配置中添加，同
        vue-router 的
        <code>to</code> 。
      </div>
    </ElFormItem>

    <div class="pane__header" style="margin-bottom:5px">
      <span class="pane__title">布局配置</span>
    </div>

    <ElFormItem>
      <div slot="label">
        拉伸高度
        <span class="paramtips">fullHeight</span>
      </div>
      <ElSwitch v-model="fullHeight"/>
      <div class="formtips">
        全屏效果，开启后
        <code>&lt;listview /&gt;</code>
        会从渲染起始位置开始往下占满剩余所有的屏幕高度，并会在重设浏览器窗体大小后继续保持铺满状态。
      </div>
    </ElFormItem>

    <ElFormItem v-show="!fullHeight">
      <div slot="label">
        指定高度
        <span class="paramtips">height</span>
      </div>
      <ElInput v-model="height" style="width:100px"/>
      <div class="formtips--inline">(300, 300px, 50%)</div>
      <div class="formtips">设置整体布局高度，包含顶部标题栏、搜索栏、正文区域、页码区域所有内容的高度，支持百分比。</div>
    </ElFormItem>

    <ElFormItem>
      <div slot="label">
        使用分页
        <span class="paramtips">usePage</span>
      </div>
      <ElSwitch v-model="usePage"/>
    </ElFormItem>

    <ElFormItem v-show="usePage">
      <div slot="label">
        默认分页
        <span class="paramtips">pageSize</span>
      </div>
      <ElRadioGroup v-model="pageSize" :class="$style.optionsGrid">
        <ElRadio v-for="(size, index) in inputPageSizes" :key="index" :label="size"/>
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem v-show="usePage">
      <div slot="label">
        可选分页
        <span class="paramtips">pageSizes</span>
      </div>
      <ElCheckboxGroup v-model="inputPageSizes" :min="1" :class="$style.optionsGrid">
        <ElCheckbox v-for="(val, index) in 10" :key="index" :value="val * 10" :label="val * 10"/>
      </ElCheckboxGroup>
      <div class="formtips">用于在分页“每页数量”可选值，至少保留一项。</div>
    </ElFormItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ListviewProps } from '@laomao800/vue-listview'
import { VModelState } from '@/store/helper'

const BindState = VModelState('listviewProps')

@Component
export default class Basic extends Vue {
  public $refs: any

  @BindState public headerTitle!: ListviewProps['headerTitle']
  @BindState public headerNav!: ListviewProps['headerNav']
  @BindState public fullHeight!: ListviewProps['fullHeight']
  @BindState public height!: ListviewProps['height']
  @BindState public usePage!: ListviewProps['usePage']
  @BindState public pageSize!: ListviewProps['pageSize']
  @BindState public pageSizes!: ListviewProps['pageSizes']

  public navInputVisible = false
  public navText = ''

  get inputPageSizes() {
    return this.pageSizes
  }
  set inputPageSizes(val) {
    this.pageSizes = val.sort((a: number, b: number) => (a > b ? 1 : -1))
  }

  @Watch('pageSizes')
  pageSizesChange(val: ListviewProps['pageSizes']) {
    if (!val.includes(this.pageSize)) {
      this.pageSize = val[0]
    }
  }

  addHeaderNav() {
    if (this.navText) {
      this.headerNav = [...this.headerNav, { text: this.navText }]
      this.navText = ''
    }
    this.navInputVisible = false
  }

  removeHeaderNav(removeIndex: number) {
    this.headerNav = this.headerNav.filter(
      (item, index) => index !== removeIndex
    )
  }

  async showNavInput() {
    this.navInputVisible = true
    await this.$nextTick()
    this.$refs.navInput.$refs.input.focus()
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.wrap {
  padding: 12px;
}
.optionsGrid {
  line-height: 1.6em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  padding-top: 4px;

  .el-checkbox {
    margin: 0;
  }
}
</style>
