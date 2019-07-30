<template>
  <EditorItemBase ref="field" :title="title">
    <i v-if="value" :class="value" style="color:#999" />
    <div slot="pop" :class="$style.popper">
      <div @click="handleChange('')">无</div>
      <div v-for="name in iconNames" :key="name" @click="handleChange(name)">
        <i :class="name" />
      </div>
    </div>
  </EditorItemBase>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'
import iconNames from '@/constants/elementIconNames.json'

@Component
export default class EditorItemIcons extends Vue {
  @Model('input', { type: String, default: '' })
  public value!: string

  @Prop({ type: String, default: '选择图标' }) title!: string

  public iconNames = iconNames

  public $refs: any

  handleChange(val: string) {
    this.$emit('input', val)
    // this.$refs.field.hidePopover()
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.popper {
  width: 400px;
  max-height: 320px;
  overflow: auto;
  padding: 6px;
  margin: -12px;
  display: grid;
  grid-template-columns: repeat(10, minmax(34px, 1fr));

  > div {
    width: 34px;
    height: 34px;
    font-size: 16px;
    line-height: 34px;
    color: #666;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
