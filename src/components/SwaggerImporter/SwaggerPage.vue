<template>
  <div class="swagger-page">
    <div class="header">
      <div class="header__title">
        {{ info.title }}
        <small>{{ info.version }}</small>
      </div>
      <div class="header__baseurl">[ Base URL: {{ baseUrl }} ]</div>
      <div class="header__desc">{{ info.description }}</div>
    </div>

    <div class="controller-wrap">
      <ElCollapse>
        <ElCollapseItem v-for="cate in categorys" :key="cate.name">
          <div class="cate__title" slot="title">
            {{ cate.name }}
            <small>{{ cate.description }}</small>
          </div>
          <div
            v-for="path in pathDataByTags[cate.name]"
            :class="['controller', `controller--${path.method}`]"
            :key="path.path"
            @click="chosenPath = path"
          >
            <ElCheckbox class="controller__check" :value="chosenPath === path" />
            <span class="controller__method">{{ path.method }}</span>
            <span class="controller__path">{{ path.path }}</span>
            <span class="controller__desc">{{ path.summary }}</span>
          </div>
        </ElCollapseItem>
      </ElCollapse>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import { classifyPathDataByTags } from './swaggerHelpers'

@Component
export default class SwaggerPage extends Vue {
  @Prop({ default: () => ({}) }) apiDocs!: any
  @Model('update:value', { default: null }) value!: any

  pathDataByTags = {}

  get chosenPath() {
    return this.value
  }
  set chosenPath(val) {
    this.$emit('update:value', val)
  }

  get info() {
    return this.apiDocs.info
  }

  get baseUrl() {
    return `${this.apiDocs.host}${this.apiDocs.basePath}`
  }

  get categorys() {
    return this.apiDocs.tags
  }

  @Watch('apiDocs', { immediate: true })
  async docsChanged() {
    this.pathDataByTags = await classifyPathDataByTags(this.apiDocs)
  }
}
</script>

<style lang="less" scoped>
.swagger-page {
  width: 100%;
  max-width: 1460px;
  padding: 0 20px;
  margin: 0 auto;
}

.header {
  margin-top: 20px;
  margin-bottom: 20px;
  color: #3b4151;

  &__title {
    margin: 0;
    font-family: Open Sans, sans-serif;
    font-size: 36px;

    small {
      position: relative;
      top: -5px;
      display: inline-block;
      padding: 0 8px;
      margin: 0 0 0 5px;
      font-size: 10px;
      line-height: 1.8em;
      color: #fff;
      vertical-align: super;
      background: #7d8492;
      border-radius: 57px;
    }
  }

  &__baseurl {
    margin-top: 10px;
    font-size: 14px;
    color: #999;
  }

  &__desc {
    margin-top: 10px;
    font-family: Open Sans, sans-serif;
    font-size: 14px;
  }
}

.controller-wrap {
  /deep/ .el-collapse-item__header {
    height: auto;
    line-height: 58px;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  /deep/ .el-collapse:not(:first-child) {
    border-top: none;
  }
}

.cate__title {
  padding: 0 10px;
  font-size: 24px;
  font-weight: bold;

  small {
    font-size: 14px;
    font-weight: 400;
  }
}

.controller {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin: 10px 0 0;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

  &__check {
    margin-right: 10px;
  }

  &__method {
    min-width: 80px;
    padding: 6px 15px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    background: #000;
    border-radius: 3px;
  }

  &__path {
    display: flex;
    flex: 0 3 auto;
    align-items: center;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 600;
    color: #3b4151;
    word-break: break-all;
  }

  &__desc {
    flex: 1;
    font-family: Open Sans, sans-serif;
    font-size: 13px;
    color: #3b4151;
  }

  &--post {
    background: rgba(73, 204, 144, 0.1);
    border-color: #49cc90;
  }
  &--post &__method {
    background: #49cc90;
  }
  &--put {
    background: rgba(252, 161, 48, 0.1);
    border-color: #fca130;
  }
  &--put &__method {
    background: #fca130;
  }
  &--delete {
    background: rgba(249, 62, 62, 0.1);
    border-color: #f93e3e;
  }
  &--delete &__method {
    background: #f93e3e;
  }
  &--get {
    background: rgba(97, 175, 254, 0.1);
    border-color: #61affe;
  }
  &--get &__method {
    background: #61affe;
  }
  &--patch {
    background: rgba(80, 227, 194, 0.1);
    border-color: #50e3c2;
  }
  &--patch &__method {
    background: #50e3c2;
  }
  &--head {
    background: rgba(144, 18, 254, 0.1);
    border-color: #9012fe;
  }
  &--head &__method {
    background: #9012fe;
  }
  &--options {
    background: rgba(13, 90, 167, 0.1);
    border-color: #0d5aa7;
  }
  &--options &__method {
    background: #0d5aa7;
  }
}
</style>
