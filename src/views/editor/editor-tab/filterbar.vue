<template>
  <ElRow :gutter="20">
    <ElCol :span="9">
      <FilterbarButtons />
    </ElCol>

    <ElCol :span="9">
      <FilterbarFields />
    </ElCol>

    <ElCol :span="6">
      <div class="editor__header">
        <div class="editor__title">
          其他
        </div>
      </div>
      <ElFormItem>
        <div slot="label">
          显示“提交”按钮
          <span class="editor__label-param">
            showFilterSearch
          </span>
        </div>
        <ElSwitch v-model="model.showFilterSearch" />
      </ElFormItem>
      <ElFormItem>
        <div slot="label">
          显示“重置”按钮
          <span class="editor__label-param">
            showFilterReset
          </span>
        </div>
        <ElSwitch v-model="model.showFilterReset" />
      </ElFormItem>
    </ElCol>
  </ElRow>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterbarButtons from './filterbar-buttons.vue'
import FilterbarFields from './filterbar-fields.vue'

@Component({
  components: {
    FilterbarButtons,
    FilterbarFields
  }
})
export default class Filterbar extends Vue {
  public model = {
    showFilterSearch: true,
    showFilterReset: true
  }
}
</script>

<style lang="less">
.config-content {
  &--object {
    pointer-events: none;
  }

  &--jsx .jsx-placeholder {
    font-size: 14px;
    font-style: italic;
    font-weight: 500;
    line-height: 32px;
    color: #999;
    text-align: center;
    border: 1px dashed #ddd;
    border-radius: 4px;
  }

  .field-meta {
    display: inline-block;
    background-color: #f1f1f1;
    box-shadow: inset 0 0 0 1px #dadee5;
    padding: 0 10px;
    border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
    vertical-align: middle;
    line-height: 24px;
    margin-top: 3px;
    color: #607d8b;
    span {
      color: #333;
      font-weight: bold;
      padding-right: 5px;
    }
  }
}
</style>
