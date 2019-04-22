<template>
  <div>
    <ElFormItem label="配置类型">
      <ElRadioGroup v-model="requestType">
        <ElRadio label="default">URL 地址</ElRadio>
        <ElRadio label="custom">自定义请求方法</ElRadio>
      </ElRadioGroup>
    </ElFormItem>

    <ElFormItem v-if="requestType === 'custom'" label="请求方法名">
      <ElInput v-model.trim="requestHandler" placeholder="requestHandler"/>
      <TipsBlock>自定义请求方法，需要返回 Promise ，会将响应的内容往后传递给响应值验证及映射等后续流程处理。</TipsBlock>
    </ElFormItem>

    <template v-else-if="requestType === 'default'">
      <ElFormItem label="数据接口">
        <div style="display:flex">
          <ElInput v-model.trim="requestUrl" placeholder="请求接口地址">
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
      <PaneTitle slot="label" title="自动加载" subtitle="autoload"/>
      <ElSwitch v-model="autoload"/>
      <TipsBlock inline>初始化后是否自动加载第一页内容。</TipsBlock>
    </ElFormItem>

    <ElFormItem v-show="!autoload">
      <PaneTitle slot="label" title="初始文案" subtitle="contentMessage"/>
      <ElSwitch v-model="setContentMessage"/>
      <TipsBlock inline>是否使用自定义初始文案，若不设置，对于默认表格视图会显示“暂无数据”。</TipsBlock>
      <div v-show="setContentMessage" style="display:flex;padding-top:10px;">
        <ElSelect
          v-model="interContentMessage.type"
          clearable
          placeholder="选择图标"
          style="width:140px"
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
            {{ index }}
          </ElOption>
        </ElSelect>
        <ElInput
          v-model.trim="interContentMessage.message"
          placeholder="暂无数据"
          style="margin-left:5px"
        />
      </div>
    </ElFormItem>

    <ElFormItem>
      <PaneTitle slot="label" title="响应值映射" subtitle="contentDataMap"/>
      <ElSwitch v-model="setContentDataMap"/>
      <TipsBlock inline>数据接口响应内容映射，在接口响应格式与内置默认取值格式不一致时使用。</TipsBlock>
      <div v-show="setContentDataMap">
        <TipsBlock>
          如果使用默认表格视图，
          <strong style="color:#f90">必须</strong>提供的 2 个必要属性，
          <code>items: object[]</code> （用于表格数据）和
          <code>total: number</code> （用于分页组件）。
        </TipsBlock>
        <ElRow :gutter="10">
          <ElCol :span="8">
            <PaneTitle
              level="2"
              title="映射配置"
              subtitle="contentDataMap"
              inline
              style="margin-bottom:5px"
            />
            <AceEditor
              ref="contentDataMapEditor"
              :content="interContentDataMap"
              lang="javascript"
              height="200px"
              @change="val => editorContentChange('contentDataMap', val)"
            />
          </ElCol>
          <ElCol :span="16">
            <PaneTitle
              level="2"
              title="映射数据"
              subtitle="contentDataMap"
              inline
              style="margin-bottom:5px"
            >
              <ElButton slot="right" type="primary" size="mini">测试映射结果</ElButton>
            </PaneTitle>
            <AceEditor
              :content="prettifyJson(contentDataResult)"
              :readonly="true"
              height="200px"
              lang="javascript"
            />
          </ElCol>
        </ElRow>
      </div>
    </ElFormItem>

    <ElFormItem>
      <PaneTitle slot="label" title="响应验证" subtitle="validateResponse"/>
      <ElSwitch v-model="setValidateResponse"/>
      <TipsBlock inline>
        验证接口响应是否成功。若接口响应格式字段有差异，可修改该配置，如果无需错误处理可直接返回
        <code>true</code> 。
      </TipsBlock>
      <div v-show="setValidateResponse">
        <AceEditor
          :content="interValidateResponse"
          height="200px"
          lang="javascript"
          @change="val => editorContentChange('validateResponse', val)"
        />
      </div>
    </ElFormItem>

    <ElFormItem>
      <PaneTitle slot="label" title="解析响应错误" subtitle="resolveResponseErrorMessage"/>
      <ElSwitch v-model="setResolveResponseErrorMessage"/>
      <TipsBlock inline>
        在
        <strong>
          响应验证
          <code>(validateResponse)</code>
        </strong>
        返回
        <code>false</code> 表示请求失败后，会调用以下方法解析错误提示信息用于显示于页面中央。
      </TipsBlock>
      <div v-show="setResolveResponseErrorMessage">
        <AceEditor
          :content="interResErrMsg"
          height="200px"
          lang="javascript"
          @change="val => editorContentChange('resolveResponseErrorMessage', val)"
        />
      </div>
    </ElFormItem>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { debounce } from 'decko'
import { ListviewProps } from '@laomao800/vue-listview'
import { prettifyJson, isFunctionString, prettifyJsonStringify } from '@/utils'
import { mapFields } from 'vuex-map-fields'

@Component({
  computed: {
    ...mapFields('project', [
      'requestUrl',
      'requestMethod',
      'autoload',
      'contentMessage',
      'contentDataMap',
      'validateResponse',
      'resolveResponseErrorMessage',
      'requestHandler'
    ]),
    ...mapFields('workspace', [
      'requestType',
      'setContentDataMap',
      'setResolveResponseErrorMessage',
      'setValidateResponse',
      'setContentMessage'
    ])
  },
  methods: {
    prettifyJson
  }
})
export default class DataSource extends Vue {
  public contentDataMap!: ListviewProps['contentDataMap']
  public contentMessage!: ListviewProps['contentMessage']
  public validateResponse!: string
  public resolveResponseErrorMessage!: string

  public contentDataResult = null
  public interContentDataMap = ''
  public interContentMessage: any = {
    type: 'info',
    message: '初次打开页面不加载数据，请组合条件进行搜索。'
  }
  public interValidateResponse = ''
  public interResErrMsg = ''
  public iconMap = {
    success: { color: '#6ac243', icon: 'el-icon-success' },
    warning: { color: '#f90', icon: 'el-icon-warning' },
    info: { color: '#459ffc', icon: 'el-icon-info' },
    error: { color: '#f56c6c', icon: 'el-icon-error' }
  }

  @Watch('setContentMessage')
  @Watch('interContentMessage', { deep: true })
  @debounce(200)
  messageChange() {
    this.contentMessage = _.cloneDeep(this.interContentMessage)
  }

  created() {
    this.interContentDataMap = prettifyJsonStringify(this.contentDataMap)
    this.interValidateResponse = this.validateResponse
    this.interResErrMsg = this.resolveResponseErrorMessage
  }

  @debounce(200)
  editorContentChange(name: string, newVal: string) {
    switch (name) {
      case 'contentDataMap':
        try {
          const parsedValue = JSON.parse(newVal)
          if (_.isPlainObject(parsedValue)) {
            this.contentDataMap = parsedValue
          }
        } catch (e) {}
        break
      case 'validateResponse':
      case 'resolveResponseErrorMessage':
        if (isFunctionString(newVal)) {
          // @ts-ignore
          this[name] = newVal
        }
        break
    }
  }
}
</script>
