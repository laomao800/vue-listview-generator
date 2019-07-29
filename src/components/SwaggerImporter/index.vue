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
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">上传 Swagger 的 api-docs.json 文件</div>
      </ElUpload>
    </div>
    <div v-if="active === 2" class="step-pane step-pane--2">
      <SwaggerPage v-model="chosenApi" :api-docs="importData" />
      <div class="footer">
        <ElButton size="large" @click="active = 1">上一步</ElButton>
        <ElButton size="large" type="primary" :disabled="!chosenApi" @click="handleSwaggerParse">下一步</ElButton>
      </div>
    </div>
    <div
      v-if="active === 3"
      v-loading="true"
      element-loading-text="正在生成..."
      class="step-pane step-pane--3"
    />
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
  importData: any = {}
  chosenApi: NormalizedPathData | null = null

  uploadHandler(config: HttpRequestOptions) {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const fileContent = (e.target as any).result
        this.importData = JSON.parse(fileContent)
        this.active = 2
      } catch (error) {
        this.$message.error('文件无法解析。' + error)
      }
    }
    reader.readAsText(config.file as any)
  }

  async handleSwaggerParse() {
    if (this.chosenApi) {
      try {
        const { host, basePath } = this.importData
        const baseUrl = `http://${host}${basePath}`
        const {
          requestUrl,
          requestMethod,
          filterFields,
          tableColumns
        } = await swaggerToListview(this.chosenApi, baseUrl)
        this.active = 3
        this.$emit('success', {
          requestUrl,
          requestMethod,
          filterFields,
          tableColumns
        })
      } catch (e) {
        this.chosenApi = null
        console.error(e.toString())
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

  &--1 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    > div {
      margin-top: -80px;
    }
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
