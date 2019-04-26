<template functional>
  <div :class="[data.staticClass, $style.item]" :style="data.staticStyle" v-on="$listeners">
    <SvgIcon v-if="props.icon" :name="props.icon" style="margin-right:5px;"/>
    <span>
      <slot>{{ props.text }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// require svg icons
const svgFiles = require.context('@/assets/icons', false, /\.svg$/)
svgFiles.keys().forEach(fileName => svgFiles(fileName))

@Component
export default class AddItemHolder extends Vue {
  @Prop({ type: String, default: 'add' })
  public icon!: string

  @Prop({ type: String, default: '新建' })
  public text!: string
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.item {
  display: flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  margin-top: 6px;
  font-size: 14px;
  line-height: 120%;
  color: #bbb;
  cursor: pointer;
  background: @main-background-color;
  border: 1px dotted @color-gray-light-2;
  border-radius: 3px;
  transition: background 120ms ease-in;

  &:hover {
    background-color: @color-gray-light-5;
  }
}
</style>
