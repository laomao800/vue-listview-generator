<template>
  <ElForm>
    <ElFormItem label="数据接口">
      <div :class="$style.request">
        <ElInput v-model="requestUrl" placeholder="请求接口地址" class="input-with-select">
          <ElSelect slot="prepend" v-model="requestMethod">
            <ElOption label="GET" value="get"/>
            <ElOption label="POST" value="post"/>
          </ElSelect>
        </ElInput>
        <ElButton
          :loading="fetchUrlLoading"
          type="primary"
          class="test-url"
          icon="el-icon-refresh"
          style="padding-left:12px;padding-right:12px"
          @click="fetchUrl"
        >测试接口</ElButton>
      </div>
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Props as ListviewPropsType } from '@laomao800/vue-listview'
import { VModelState } from '@/store/helper'

@Component
export default class DataSource extends Vue {
  @VModelState('listviewProps')
  public requestUrl!: ListviewPropsType['requestUrl']

  @VModelState('listviewProps')
  public requestMethod!: ListviewPropsType['requestMethod']

  @VModelState('listviewProps')
  public contentDataMap!: ListviewPropsType['contentDataMap']

  @VModelState('listviewProps')
  public validateResponse!: ListviewPropsType['validateResponse']

  @VModelState('listviewProps')
  public resolveResponseErrorMessage!: ListviewPropsType['resolveResponseErrorMessage']

  public fetchUrlLoading = false

  fetchUrl() {}
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.request {
  display: flex;

  .test-url {
    margin-left: 10px;
  }
}
</style>
