<template>
  <div :class="[$style.wrap, (level && $style[`level-${level}`]), (inline && $style.inline)]">
    <span :class="$style.title">{{ title }}</span>
    <small v-if="subtitle" :class="$style.subtitle">{{ subtitle }}</small>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class PaneTitle extends Vue {
  @Prop({ type: [String, Number], default: '' }) level!: string
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) subtitle!: string
  @Prop({ type: Boolean, default: false }) inline!: boolean
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.el-form--label-top .el-form-item__label {
  position: relative;
  display: block;
  padding-bottom: 0;
  padding-left: 0.5em;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 3px;
    height: 12px;
    margin-top: -6px;
    line-height: 1em;
    content: '';
    background: @color-adorn;
  }

  .paramtips {
    display: inline-block;
  }
}

.wrap {
  padding: 0 8px;

  .title {
    font-size: 14px;
    color: #666;
  }

  .subtitle {
    display: block;
    padding-left: 5px;
    margin-top: -8px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: @color-adorn;
    word-break: break-all;
  }
}

.level-1 {
  box-sizing: content-box;
  height: 34px;
  overflow: hidden;
  line-height: 34px;
  background: darken(@main-background-color, 2);
  border-left: 3px solid #409eff;
  box-shadow: inset 0 -1px 0 #e9edf4;

  .subtitle {
    display: inline-block;
  }
}

.level-2 {
  position: relative;
  display: block;
  padding-left: 11px;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 3px;
    height: 12px;
    margin-top: -6px;
    line-height: 1em;
    content: '';
    background: @color-adorn;
  }
}

.inline {
  .subtitle {
    display: inline-block;
  }
}
</style>
