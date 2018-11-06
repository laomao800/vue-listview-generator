<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="editor__header">
        <div class="editor__title">标题栏配置</div>
      </div>
      <el-form-item>
        <div slot="label">
          列表标题
          <span class="editor__label-param">headerTitle</span>
        </div>
        <el-input v-model="model.headerTitle" />
        <div class="tips">显示于顶部面包屑左侧的列表标题</div>
      </el-form-item>

      <el-form-item>
        <div slot="label">
          面包屑
          <span class="editor__label-param">headerNav</span>
        </div>
        <el-tag
          v-for="(nav, index) in model.headerNav"
          :key="index"
          closable
          :disable-transitions="false"
          style="margin-right:10px"
          @close="removeHeaderNav(index)"
        >
          {{ nav.text }}
        </el-tag>
        <el-input
          v-if="navInputVisible"
          ref="navInput"
          v-model.trim="navText"
          size="small"
          style="width:160px;height:32px;"
          @keyup.esc.native="navText = ''; navInputVisible = false;"
          @keyup.enter.native="addHeaderNav"
          @blur="addHeaderNav"
        />
        <el-button
          v-else
          size="small"
          @click="showNavInput"
        >
          + 新增子项
        </el-button>
        <div class="tips">面包屑同时支持 <code>to</code> 属性设置路由跳转对象，可在生成后的配置中添加，同 vue-router 的 <code>to</code> 。</div>
      </el-form-item>

      <div class="editor__header">
        <div class="editor__title">布局配置</div>
      </div>
      <el-form-item>
        <div slot="label">
          拉伸高度
          <span class="editor__label-param">fullHeight</span>
        </div>
        <el-switch v-model="model.fullHeight" />
        <div class="tips">
          全屏效果，开启后 <code>&lt;listview /&gt;</code> 会从渲染起始位置开始往下占满剩余所有的屏幕高度，并会在重设浏览器窗体大小后继续保持铺满状态。
        </div>
      </el-form-item>

      <el-form-item v-show="!model.fullHeight">
        <div slot="label">
          指定高度
          <span class="editor__label-param">height</span>
        </div>
        <el-input v-model="model.height" style="width:120px" />
        <div class="tips-inline">e.g. 300, 300px, 50%</div>
        <div class="tips">
          设置整体布局高度，包含顶部标题栏、搜索栏、正文区域、页码区域所有内容的高度，支持百分比。
        </div>
      </el-form-item>

      <el-form-item v-show="!model.fullHeight">
        <div slot="label">
          内容最小高度
          <span class="editor__label-param">contentMinHeight</span>
        </div>
        <el-input-number
          v-model="model.contentMinHeight"
          :min="0"
          controls-position="right"
          style="width:120px"
        />
        <div class="tips">
          在没有开启拉伸高度和没有指定高度时， <code>&lt;listview /&gt;</code> 高度随内容变化，该值可用于限制内容区域的最小高度，默认值 160 。
        </div>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <div class="editor__header">
        <div class="editor__title">其他配置</div>
      </div>
      <el-form-item>
        <div slot="label">
          数据自动加载
          <span class="editor__label-param">autoload</span>
        </div>
        <el-switch v-model="model.autoload" />
        <div class="tips-inline">进入页面是否自动加载第一页数据</div>
      </el-form-item>

      <div v-show="!model.autoload">
        <el-form-item>
          <div slot="label">
            初始文案
            <span class="editor__label-param">contentMessage</span>
          </div>
          <el-switch v-model="useContentMessage" />
          <div class="tips-inline">是否使用自定义初始文案，默认显示“暂无数据”。</div>
          <div v-show="useContentMessage" style="padding-top:10px;">
            <el-input v-model="contentMessage" placeholder="初始文案" />
          </div>
        </el-form-item>
      </div>

      <el-form-item>
        <div slot="label">
          使用分页
          <span class="editor__label-param">usePage</span>
        </div>
        <el-switch v-model="model.usePage" />
      </el-form-item>

      <div v-show="model.usePage">
        <el-form-item>
          <div slot="label">
            默认分页
            <span class="editor__label-param">pageSize</span>
          </div>
          <el-radio-group
            v-model="model.pageSize"
            class="pages-group"
          >
            <el-radio
              v-for="(size, index) in inputPageSizes"
              :key="index"
              :label="size"
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div slot="label">
            可选分页
            <span class="editor__label-param">pageSizes</span>
          </div>
          <el-checkbox-group
            v-model="inputPageSizes"
            :min="1"
            class="pages-group"
          >
            <el-checkbox
              v-for="(val, index) in 10"
              :key="index"
              :value="val*10"
              :label="val*10"
            />
          </el-checkbox-group>
          <div class="tips">
            用于在分页“每页数量”可选值，至少保留一项。
          </div>
        </el-form-item>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Basic extends Vue {
  public model: {
    [k: string]: any
  } = {
    headerTitle: '',
    headerNav: [],
    fullHeight: true,
    height: null,
    contentMinHeight: null,
    contentMessage: null,
    autoload: true,
    usePage: true,
    pageSize: 20,
    pageSizes: [20, 50, 100]
  }
  public navInputVisible = false
  public navText = ''
  public useContentMessage = false
  public contentMessage: string | null =
    '初次打开页面不加载数据，请组合条件进行搜索。'

  public $refs: any

  get inputPageSizes() {
    return this.model.pageSizes
  }
  set inputPageSizes(val) {
    this.model.pageSizes = val.sort((a: number, b: number) => (a > b ? 1 : -1))
  }
  get iconMap() {
    return {
      success: { color: '#6ac243', icon: 'el-icon-success' },
      warning: { color: '#f90', icon: 'el-icon-warning' },
      info: { color: '#459ffc', icon: 'el-icon-info' },
      error: { color: '#f56c6c', icon: 'el-icon-error' }
    }
  }

  @Watch('useContentMessage')
  onMsgChanged(val: boolean) {
    this.model.contentMessage = val ? this.contentMessage : null
  }

  addHeaderNav() {
    if (this.navText) {
      this.model.headerNav.push({ text: this.navText })
      this.navText = ''
    }
    this.navInputVisible = false
  }

  removeHeaderNav(index: number) {
    this.model.headerNav.splice(index, 1)
  }

  async showNavInput() {
    this.navInputVisible = true
    await this.$nextTick()
    this.$refs.navInput.$refs.input.focus()
  }
}
</script>

<style lang="less" scoped>
.pages-group {
  width: 400px;

  .el-radio,
  .el-checkbox {
    margin-right: 30px;
    margin-left: 0;
  }
  .el-radio {
    line-height: 36px;
  }
}
</style>
