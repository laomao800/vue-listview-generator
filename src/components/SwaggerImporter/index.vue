<template>
  <div class="swagger-importer">
    <ElSteps :active="active" align-center class="steps-nav">
      <ElStep title="导入 Swagger 接口" description="上传 api-docs.json 文件" />
      <ElStep title="选择目标接口" description="用于请求列表页面的接口地址" />
      <ElStep title="生成配置" description="完成" />
    </ElSteps>
    <div v-if="active === 1" class="step-pane step-pane--1">
      <ElUpload drag action="undefined" :show-file-list="false" :http-request="uploadHandler">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传 Swagger 的 api-docs.json 文件</div>
      </ElUpload>
    </div>
    <div v-if="active === 2" class="step-pane step-pane--2">
      <pre style="height:200px;overflow:auto;">{{ listviewProps }}</pre>
      <SwaggerPage v-model="chosenApi" :api-docs="importData" />
      <div class="footer">
        <ElButton size="large" @click="active = 1">上一步</ElButton>
        <ElButton size="large" type="primary" :disabled="!chosenApi" @click="handleSwaggerParse">下一步</ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { HttpRequestOptions } from 'element-ui/types/upload'
import { NormalizedPathData } from '@/types/swagger'
import SwaggerPage from './SwaggerPage.vue'
import { swaggerToListview } from './swaggerHelpers'

@Component({
  components: {
    SwaggerPage
  }
})
export default class SwaggerImporter extends Vue {
  active = 1
  importData = {}
  chosenApi: NormalizedPathData | null = null
  listviewProps: any = null

  created() {
    // temp
    this.importData = require('./api-docs.json')
    this.active = 2
  }

  uploadHandler(config: HttpRequestOptions) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const fileContent = (e.target as any).result
        this.importData = JSON.parse(fileContent)
        this.active = 2
      } catch (error) {
        this.$message.error('文件无法解析。' + error)
      }
    }
    reader.readAsText(config.file.raw)
  }

  async handleSwaggerParse() {
    if (this.chosenApi) {
      try {
        this.listviewProps = await swaggerToListview(this.chosenApi)
      } catch (e) {
        this.chosenApi = null
        console.error(e)
        this.$message.error({
          message: e
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swagger-importer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.steps-nav {
  margin-bottom: 20px;
}

.step-pane {
  flex: 1;
  padding: 10px;

  &--1 {
    padding-top: 40px;
    text-align: center;
  }

  &--2 {
    display: flex;
    flex-direction: column;

    .swagger-page {
      flex: 1;
      overflow: auto;
    }

    .footer {
      padding: 20px 0;
      text-align: center;
    }
  }
}

</style>
