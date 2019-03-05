<template functional>
  <div :class="[$style.wrap, props.inline && $style.inline]" :style="data.staticStyle">
    <div v-if="props.title" :class="$style.title">{{ props.title }}</div>
    <div :class="$style.content">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FieldInput extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Boolean, default: false }) inline!: boolean
}
</script>

<style lang="less" module>
.wrap {
  padding: 0 8px;
}

.inline {
  display: flex;
  align-items: center;
  min-height: 28px;
  line-height: 120%;

  .title {
    max-width: 50%;
    padding: 0 10px 0 0;
    white-space: nowrap;
  }

  .content {
    width: 60%;
    margin-left: auto;
  }
}

.title {
  padding-top: 8px;
  padding-bottom: 2px;
  font-size: 12px;
  font-weight: 500;
  color: #888;
}

.content {
  padding: 2px 0;

  > * {
    vertical-align: top;
  }
}
</style>
