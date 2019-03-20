<template>
  <div class="basic-wrap" :class="$style.wrap">
    <PaneTitle level="1" title="顶部通栏配置"/>

    <ElFormItem>
      <PaneTitle slot="label" level="2" title="页面标题" subtitle="headerTitle" inline/>
      <ElInput v-model="headerTitle"/>
      <TipsBlock>显示于顶部面包屑左侧的列表标题</TipsBlock>
    </ElFormItem>

    <ElFormItem>
      <PaneTitle slot="label" level="2" title="面包屑" subtitle="headerNav" inline/>
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
      <TipsBlock>
        面包屑支持
        <code>to</code> 属性设置路由跳转对象，可在生成后的配置中添加，同
        vue-router 的
        <code>to</code> 。
      </TipsBlock>
    </ElFormItem>

    <PaneTitle level="1" title="布局配置"/>

    <ElFormItem>
      <PaneTitle slot="label" level="2" title="拉伸高度" subtitle="fullHeight" inline>
        <ElSwitch slot="right" v-model="fullHeight"/>
      </PaneTitle>
      <TipsBlock>
        全屏效果，开启后
        <code>&lt;listview /&gt;</code>
        会从渲染起始位置开始往下占满剩余所有的屏幕高度，并会在重设浏览器窗体大小后继续保持铺满状态。
      </TipsBlock>
    </ElFormItem>

    <ElFormItem v-show="!fullHeight">
      <PaneTitle slot="label" level="2" title="指定高度" subtitle="height" inline/>
      <ElInput v-model="height" style="width:100px"/>
      <TipsBlock inline>(300, 300px, 50%)</TipsBlock>
      <TipsBlock>设置整体布局高度，包含顶部标题栏、搜索栏、正文区域、页码区域所有内容的高度，支持百分比。若不指定则为根据内容自动高度。</TipsBlock>
    </ElFormItem>

    <ElFormItem>
      <PaneTitle slot="label" level="2" title="使用分页" subtitle="usePage" inline>
        <ElSwitch slot="right" v-model="usePage"/>
      </PaneTitle>
      <!-- TODO: 自定义分页参数名 -->
    </ElFormItem>

    <ElFormItem v-show="usePage">
      <PaneTitle slot="label" level="2" title="默认分页" subtitle="pageSize" inline/>
      <ElRadioGroup v-model="pageSize" :class="$style.optionsGrid">
        <ElRadio v-for="(size, index) in inputPageSizes" :key="index" :label="size"/>
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem v-show="usePage">
      <PaneTitle slot="label" level="2" title="可选分页" subtitle="pageSizes" inline/>
      <ElCheckboxGroup v-model="inputPageSizes" :min="1" :class="$style.optionsGrid">
        <ElCheckbox v-for="(val, index) in 10" :key="index" :value="val * 10" :label="val * 10"/>
      </ElCheckboxGroup>
      <TipsBlock>用于在分页“每页数量”可选值，至少保留一项。</TipsBlock>
    </ElFormItem>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ListviewProps } from '@laomao800/vue-listview'
import { VModelState } from '@/store/helper'

const BindState = VModelState('listviewProps')

@Component
export default class Basic extends Vue {
  public $refs: any

  @BindState
  public headerTitle!: ListviewProps['headerTitle']

  @BindState
  public headerNav!: ListviewProps['headerNav']

  @BindState
  public fullHeight!: ListviewProps['fullHeight']

  @BindState
  public height!: ListviewProps['height']

  @BindState
  public usePage!: ListviewProps['usePage']

  @BindState
  public pageSize!: ListviewProps['pageSize']

  @BindState
  public pageSizes!: ListviewProps['pageSizes']

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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  padding-top: 4px;
  line-height: 1.6em;

  .el-checkbox {
    margin: 0;
  }
}
</style>

<style>
.basic-wrap .el-form-item__label {
  display: block;
  padding-bottom: 0;
}
</style>
