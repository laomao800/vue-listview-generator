<template functional>
  <div :class="[$style.tips, (props.inline && $style.inline)]">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TipsBlock extends Vue {
  @Prop({ type: Boolean, default: false }) inline!: boolean
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.tips,
.inline {
  font-size: 12px;
  line-height: 1.4em;
  color: #999;
}

.tips {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.inline {
  display: inline;
  padding-left: 0.5em;
}
</style>
