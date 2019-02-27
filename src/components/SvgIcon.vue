<template>
  <svg class="svg-icon" aria-hidden="true">
    <use v-bind="{ 'xlink:href': iconName }"></use>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// require svg icons
const svgFiles = require.context('@/assets/icons', false, /\.svg$/)
svgFiles.keys().forEach(fileName => svgFiles(fileName))

@Component
export default class SvgIcon extends Vue {
  @Prop({
    type: String,
    required: true,
    default: ''
  })
  public name!: string

  get iconName() {
    return `#icon-${this.name}`
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
