<template>
  <div :class="$style.wrap">
    <ElFormItem label="数据接口">
      <div :class="$style.request" style="display:flex">
        <ElInput v-model="requestUrl" placeholder="请求接口地址">
          <ElSelect slot="prepend" v-model="requestMethod" style="width:100px">
            <ElOption label="GET" value="get"/>
            <ElOption label="POST" value="post"/>
          </ElSelect>
        </ElInput>
        <ElButton
          :loading="fetchUrlLoading"
          type="primary"
          icon="el-icon-refresh"
          style="margin-left:10px"
          @click="fetchUrl"
        >测试接口</ElButton>
      </div>
    </ElFormItem>
  </div>
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

.wrap {
  padding: 16px;
}
</style>
