<template functional>
  <ElDropdownItem :command="props.command" v-bind="data.attrs" class="menu-item">
    <SvgIcon :name="props.icon" class="menu-item__icon" />
    {{props.text}}
  </ElDropdownItem>
</template>

<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class IconMenuItem extends Vue {
  @Prop({ type: String, default: '' }) command!: string
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({ type: String, default: '' }) text!: string
}
</script>

<style lang="less" scoped>
.menu-item {
  white-space: nowrap;
}
.menu-item__icon {
  margin-right: 5px;
  font-size: 18px;
}
</style>
