<template functional>
  <div class="field-divider">
    <div v-if="props.title" class="field-divider__title">{{ props.title }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FieldDivider extends Vue {
  @Prop({ type: String, default: '' })
  public title!: string
}
</script>

<style lang="less" scoped>
@import url('~@/style/theme.less');

.field-divider {
  position: relative;
  min-height: 1px;
  margin: 8px 0;
  line-height: 1;
  user-select: none;

  &::before {
    position: absolute;
    top: 50%;
    display: block;
    width: 100%;
    height: 1px;
    margin-top: -1px;
    overflow: hidden;
    content: '';
    background-color: @color-gray-light-3;
  }

  &__title {
    display: inline-block;
    padding: 0 5px;
    margin: 0 0 0 4px;
    font-size: 12px;
    font-weight: 700;
    color: @color-primary;
    color: @color-adorn;
    cursor: default;
    background: #fff;
    transform: scale(0.9);
  }
}
</style>
