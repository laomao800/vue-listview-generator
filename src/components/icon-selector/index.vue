<template>
  <el-select
    v-model="currentValue"
    clearable
    popper-class="icon-selector"
  >
    <el-option
      v-for="(name, index) in iconNames"
      :key="index"
      :label="name"
      :value="name"
    >
      <i :class="name" />
      <!-- <span style="margin-left:1em">{{ name }}</span> -->
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import iconNames from './element-ui-icon-names'

@Component
export default class IconSelector extends Vue {
  @Model('update:value', { type: String, default: '' })
  value!: boolean

  public iconNames = iconNames

  get currentValue() {
    return this.value
  }

  set currentValue(val) {
    this.$emit('update:value', val)
  }
}
</script>

<style lang="less">
.icon-selector {
  width: 300px;
  padding: 5px;

  .el-select-dropdown__item {
    float: left;
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 16px;
    line-height: 40px;
    color: #969696;
    text-align: center;
  }
}
</style>
