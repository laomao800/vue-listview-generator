<template>
  <el-row :gutter="20">
    <el-col :span="14">
      <el-form-item label="数据接口">
        <div class="request-url">
          <el-input
            v-model="model.requestUrl"
            placeholder="请求接口地址"
            class="input-with-select"
          >
            <el-select
              slot="prepend"
              v-model="model.requestMethod"
            >
              <el-option label="GET" value="get" />
              <el-option label="POST" value="post" />
            </el-select>
          </el-input>
          <el-button
            :loading="fetchUrlLoading"
            type="primary"
            class="test-url"
            icon="el-icon-refresh"
            style="padding-left:12px;padding-right:12px"
            @click="fetchUrl"
          >
            测试接口
          </el-button>
        </div>
      </el-form-item>

      <el-form-item label="测试参数">
        <ace-editor
          ref="requestDataEditor"
          :content="jsonToString({
            page_index: 1,
            page_size: 20
          })"
          height="100px"
          lang="javascript"
        />
      </el-form-item>

      <el-form-item label="响应值映射">
        <el-switch v-model="useContentDataMap" />
        <div class="tips-inline">
          数据接口响应内容属性映射，在接口响应格式与默认映射格式不一致时使用。
        </div>
        <template v-if="useContentDataMap">
          <div class="tips">
            如果使用默认表格视图，<strong>必须</strong>提供的 2 个必要属性： <code>items(object[])</code> 用于表格数据 和 <code>total(number)</code> 用于分页组件。
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="editor__header" style="margin-bottom:5px">
                <span class="editor__title">映射配置</span>
              </div>
              <ace-editor
                ref="contentDataMapEditor"
                :content="jsonToString({
                  items: 'result.items',
                  total: 'result.total_count'
                })"
                height="200px"
                lang="javascript"
              />
            </el-col>
            <el-col :span="16">
              <div class="editor__header" style="margin-bottom:5px">
                <el-button
                  :loading="testMapLoading"
                  type="primary"
                  size="mini"
                  style="float:right"
                  @click="testContentDataMap"
                >
                  测试映射结果
                </el-button>
                <span class="editor__title">映射数据</span>
              </div>
              <ace-editor
                v-loading="testMapLoading"
                :content="jsonToString(contentDataResult)"
                :readonly="true"
                height="200px"
                lang="javascript"
              />
            </el-col>
          </el-row>
        </template>
      </el-form-item>

      <el-form-item label="响应验证">
        <el-switch v-model="useValidateResponse" />
        <div class="tips-inline">
          验证接口响应是否成功。若接口响应格式字段有差异，可修改该配置，如果无需错误处理可直接返回 <code>true</code> 。
        </div>
        <template v-if="useValidateResponse">
          <div>validateResponse</div>
        </template>
      </el-form-item>

      <el-form-item label="解析响应错误">
        <el-switch v-model="useResolveResponseErrorMessage" />
        <div class="tips-inline">
          在 <code>validateResponse</code> 返回 <code>false</code> 表示请求失败后，会调用 <code>resolveResponseErrorMessage</code> 解析错误提示信息。
        </div>
        <template v-if="useResolveResponseErrorMessage">
          <div>resolveResponseErrorMessage</div>
        </template>
      </el-form-item>

      <el-form-item label="其他">
        <del>
          requestConfig,
          requestHandler,
          transformRequestData,
          transformResponseData
        </del>
      </el-form-item>

      <!-- <el-form-item label="">request-transform</el-form-item>
      <el-form-item label="">response-transform</el-form-item>
      <el-form-item label="">response-data-map</el-form-item>
      <el-form-item label="">request-config</el-form-item> -->
    </el-col>
    <el-col :span="10">
      <el-tabs v-loading="fetchUrlLoading" class="response__tabs">
        <el-tab-pane label="Response body">
          <ace-editor
            :content="jsonToString(responseBody)"
            :readonly="true"
            lang="javascript"
          />
        </el-tab-pane>
        <el-tab-pane label="Response headers">
          <ace-editor
            :content="jsonToString(responseHeaders)"
            :readonly="true"
            lang="javascript"
          />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import _ from 'lodash'
import json5 from 'json5'
import axios, { AxiosRequestConfig } from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import { dataMapping } from '@laomao800/vue-listview/src/utils/utils'
import { Props } from '@laomao800/vue-listview'
import { updateConfigFunc } from '@/types'
import { jsonToString } from '@/utils'

@Component({
  methods: {
    jsonToString
  }
})
export default class DataSource extends Vue {
  public model: {
    [k: string]: any
  } = {
    requestUrl:
      'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',
    requestMethod: 'post'
  }

  public fetchUrlLoading = false
  public testMapLoading = false
  public responseBody = null
  public responseHeaders = null
  public useContentDataMap = false
  public contentDataResult = null
  public useValidateResponse = false
  public useResolveResponseErrorMessage = false

  public $refs: any

  async fetchUrl() {
    const url = this.model.requestUrl
    if (!url) {
      return this.$message.error('请先填写数据接口。')
    }

    this.fetchUrlLoading = true
    const axiosService = axios.create()
    const method = this.model.requestMethod
    const requestConfig: AxiosRequestConfig = {
      url,
      method,
      withCredentials: true
    }

    // 获取用户自定义参数，无法通过 json 解析则使用原始字符串
    let requestData = this.$refs.requestDataEditor.getValue()
    try {
      requestData = json5.parse(requestData)
    } catch (e) {}

    if (method === 'post') {
      requestConfig.data = requestData
    } else {
      requestConfig.params = requestData
    }

    try {
      const response = await axiosService(requestConfig)
      this.responseBody = response.data
      this.responseHeaders = response.headers
      this.fetchUrlLoading = false
    } catch (e) {
      this.responseBody = e.toString()
      this.fetchUrlLoading = false
    }
  }

  async testContentDataMap() {
    this.testMapLoading = true
    let contentDataMap
    const contentDataMapString = this.$refs.contentDataMapEditor.getValue()
    try {
      contentDataMap = json5.parse(contentDataMapString)
    } catch (e) {
      return this.$message.error(`映射配置解析失败。${e.toString()}`)
    }
    try {
      await this.fetchUrl()
    } catch (e) {
      this.testMapLoading = false
      return this.$message.error(e.toString())
    }
    if (_.isPlainObject(this.responseBody)) {
      this.contentDataResult = dataMapping(this.responseBody, contentDataMap)
    }
    this.testMapLoading = false
  }
}
</script>

<style lang="less">
.request-url {
  display: flex;

  .test-url {
    margin-left: 10px;
  }
}
.response__tabs.el-tabs.el-tabs--top {
  .el-tabs__header {
    margin-bottom: 22px;
  }
  .el-tabs__item {
    height: 36px;
    line-height: 36px;

    &:nth-child(2) {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
