<template functional>
  <div :class="$style.wrap" :style="data.staticStyle">
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
}
</script>

<style lang="less" module>
.wrap {
  padding: 0 8px;
}
.title {
  padding-top: 8px;
  padding-bottom: 2px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: #888;
}
.content {
  padding: 2px 0;
}
</style>
