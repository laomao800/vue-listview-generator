<template>
  <div>
    <ElFormItem label="配置类型">
      <ElRadioGroup v-model="configType">
        <ElRadio label="default">URL 地址</ElRadio>
        <ElRadio label="custom">自定义请求方法</ElRadio>
      </ElRadioGroup>
    </ElFormItem>

    <ElFormItem v-if="configType === 'custom'" label="请求方法名">
      <ElInput v-model="requestHandler" placeholder="requestHandler"/>
      <div class="formtips">自定义请求方法，需要返回 Promise ，会将响应的内容往后传递给响应值验证及映射等后续流程处理。</div>
    </ElFormItem>

    <template v-else-if="configType === 'default'">
      <ElFormItem label="数据接口">
        <div style="display:flex">
          <ElInput v-model="requestUrl" placeholder="请求接口地址">
            <ElSelect slot="prepend" v-model="requestMethod" style="width:100px">
              <ElOption label="GET" value="get"/>
              <ElOption label="POST" value="post"/>
            </ElSelect>
          </ElInput>
          <ElButton type="primary" icon="el-icon-refresh" style="margin-left:10px">测试接口</ElButton>
        </div>
      </ElFormItem>
    </template>

    <ElFormItem>
      <template slot="label">
        自动加载
        <span class="paramtips">autoload</span>
      </template>
      <ElSwitch v-model="autoload"/>
      <div class="formtips--inline">初始化后是否自动加载第一页内容。</div>
    </ElFormItem>

    <ElFormItem v-show="!autoload">
      <div slot="label">
        初始文案
        <span class="paramtips">contentMessage</span>
      </div>
      <ElSwitch v-model="useContentMessage"/>
      <div class="formtips--inline">是否使用自定义初始文案，若不设置，对于默认表格视图会显示“暂无数据”。</div>
      <div v-show="useContentMessage" style="display:flex;padding-top:10px;">
        <ElSelect
          v-model="interContentMessage.type"
          clearable
          placeholder="选择图标"
          style="width:120px"
        >
          <span slot="prefix" style="margin-left: 4px;margin-top: -2px;">
            <i
              v-if="interContentMessage.type"
              :class="iconMap[interContentMessage.type].icon"
              :style="`color:${iconMap[interContentMessage.type].color}`"
            />
          </span>
          <ElOption value>无图标</ElOption>
          <ElOption v-for="(item, index) in iconMap" :key="index" :value="index">
            <i :class="item.icon" :style="`color:${item.color}`"/>
          </ElOption>
        </ElSelect>
        <ElInput v-model="interContentMessage.message" placeholder="暂无数据" style="margin-left:5px"/>
      </div>
    </ElFormItem>

    <ElFormItem>
      <template slot="label">
        响应值映射
        <span class="paramtips">contentDataMap</span>
      </template>
      <ElSwitch v-model="setContentDataMap"/>
      <div class="formtips--inline">数据接口响应内容映射，在接口响应格式与内置默认取值格式不一致时使用。</div>
      <div v-show="setContentDataMap">
        <div class="formtips">
          如果使用默认表格视图，
          <strong>必须</strong>提供的 2 个必要属性，
          <code>items: object[]</code> （用于表格数据）和
          <code>total: number</code> （用于分页组件）。
        </div>
        <ElRow :gutter="10">
          <ElCol :span="8">
            <div class="pane__header" style="margin-bottom:5px">
              <span class="pane__title">映射配置</span>
            </div>
            <AceEditor
              ref="contentDataMapEditor"
              :content="formatJson(contentDataMap)"
              lang="javascript"
              height="200px"
              @change="dataMapChange"
            />
          </ElCol>
          <ElCol :span="16">
            <div class="pane__header" style="margin-bottom:5px">
              <ElButton type="primary" size="mini" style="float:right">测试映射结果</ElButton>
              <span class="pane__title">映射数据</span>
            </div>
            <AceEditor
              :content="formatJson(contentDataResult)"
              :readonly="true"
              height="200px"
              lang="javascript"
            />
          </ElCol>
        </ElRow>
      </div>
    </ElFormItem>

    <ElFormItem>
      <template slot="label">
        响应验证
        <span class="paramtips">validateResponse</span>
      </template>
      <ElSwitch v-model="setValidateResponse"/>
      <div class="formtips--inline">
        验证接口响应是否成功。若接口响应格式字段有差异，可修改该配置，如果无需错误处理可直接返回
        <code>true</code> 。
      </div>
      <div v-show="setValidateResponse">
        <AceEditor :content="validateResponse.toString()" height="200px" lang="javascript"/>
      </div>
    </ElFormItem>

    <ElFormItem>
      <template slot="label">
        解析响应错误
        <span class="paramtips">resolveResponseErrorMessage</span>
      </template>
      <ElSwitch v-model="setResolveResponseErrorMessage"/>
      <div class="formtips--inline">
        在
        <code>validateResponse</code> 返回
        <code>false</code> 表示请求失败后，会调用
        <code>resolveResponseErrorMessage</code> 解析错误提示信息用于显示于页面中央。
      </div>
      <div v-show="setResolveResponseErrorMessage">
        <AceEditor
          :content="resolveResponseErrorMessage.toString()"
          height="200px"
          lang="javascript"
        />
      </div>
    </ElFormItem>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { debounce } from 'decko'
import { ListviewProps } from '@laomao800/vue-listview'
import { VModelState } from '@/store/helper'
import { formatJson } from '@/utils'

const BindState = VModelState('listviewProps')

@Component({
  methods: {
    formatJson
  }
})
export default class DataSource extends Vue {
  @BindState public requestUrl!: ListviewProps['requestUrl']
  @BindState public requestMethod!: ListviewProps['requestMethod']
  @BindState public autoload!: ListviewProps['autoload']
  @BindState public contentMessage!: ListviewProps['contentMessage']
  @BindState public contentDataMap!: ListviewProps['contentDataMap']
  @BindState public validateResponse!: ListviewProps['validateResponse']
  // prettier-ignore
  @BindState public resolveResponseErrorMessage!: ListviewProps['resolveResponseErrorMessage']
  @BindState public requestHandler!: ListviewProps['requestHandler']

  public configType: 'default' | 'custom' = 'default'
  public setContentDataMap = false
  public setResolveResponseErrorMessage = false
  public setValidateResponse = false
  public useContentMessage = false
  public contentDataResult = null
  public interContentMessage = {
    type: 'info',
    message: '初次打开页面不加载数据，请组合条件进行搜索。'
  }

  get iconMap() {
    return {
      success: { color: '#6ac243', icon: 'el-icon-success' },
      warning: { color: '#f90', icon: 'el-icon-warning' },
      info: { color: '#459ffc', icon: 'el-icon-info' },
      error: { color: '#f56c6c', icon: 'el-icon-error' }
    }
  }

  @debounce(200)
  dataMapChange(val: string) {
    console.log(val)
  }
}
</script>
