<template>
  <div class="preview-area">
    <ElForm
      :inline="true"
      size="small"
    >
      <ElFormItem style="margin:0">
        <Transition
          v-if="field.label"
          name="label-trans"
        >
          <div
            v-if="showFieldLabel"
            class="filterbar__field-label"
          >
            {{ field.label }}
          </div>
        </Transition>
        <Component
          :is="fieldCmpName"
          :model="model"
          :field="field"
          v-bind="{
            // field.width 判断如果放在 {} 内，会导致 field 内的 style 属性的 width 失效
            style: field.width ? { width: `${field.width}px` } : null
          }"
        />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import _ from 'lodash'
import hasValues from 'has-values'
import fieldComponents from '@laomao800/vue-listview/src/components/fields'

const componentKeys = Object.keys(fieldComponents)
const fieldKeys = componentKeys.map(key =>
  _.camelCase(key.replace(/^field/i, ''))
)
const fieldMaps = _.zipObject(fieldKeys, componentKeys)

@Component({
  components: fieldComponents
})
export default class FilterPreview extends Vue {
  @Prop({ type: String, default: '' })
  public fieldType!: string
  @Prop({ type: Object, default: () => ({}) })
  public fieldConfig!: object

  public model: {
    [k: string]: any
  } = {}

  get field() {
    return {
      ...this.fieldConfig,
      model: 'preview'
    }
  }

  get fieldCmpName() {
    const type = _.camelCase(this.fieldType)
    return fieldMaps[type]
  }

  get value() {
    return this.model['preview']
  }

  get showFieldLabel() {
    // hasValues(null) -> true ，所以需要和 value 同时判断
    return this.value && hasValues(this.value)
  }
}
</script>

<style lang="less" scoped>
.preview-area {
  position: relative;
  padding: 50px 20px 20px;
  margin-bottom: 25px;
  text-align: center;
  border: 1px solid #e9edf4;
  border-radius: 4px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    font-size: 12px;
    line-height: 30px;
    content: '效果预览';
    background-color: #E9EDF4E9EDF4;
  }
}
</style>

<style lang="less">
.filterbar__field {
  position: relative;
  display: inline-block;
}
.filterbar__field-label {
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 1;
  padding: 0 0.2em;
  font-size: 12px;
  line-height: 12px;
  color: #999;
  background-color: #fff;
  opacity: 1;
  transform: translateY(-50%) scale(0.9);
  transform-origin: center bottom;
}
.label-trans-enter-active,
.label-trans-leave-active {
  top: 0;
  opacity: 1;
  transition: 0.2s;
}
.label-trans-enter,
.label-trans-leave-active {
  top: 50%;
  opacity: 0;
}
</style>
