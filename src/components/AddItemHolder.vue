<template>
  <div :class="$style.item" v-on="$listeners">
    <SvgIcon v-if="icon" :name="icon" style="margin-right:5px;"/>
    <span>
      <slot>新建</slot>
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
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.item {
  display: flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  margin-left: 20px;
  font-size: 14px;
  line-height: 120%;
  color: #bbb;
  cursor: pointer;
  border-radius: 3px;
  transition: background 120ms ease-in;

  &:hover {
    background-color: #efefef;
  }
}
</style>
