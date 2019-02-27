<template>
  <div style="padding:5px 10px;">
    <ElButton :type="type" :icon="icon" :plain="plain">{{ text }}</ElButton>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FilterButton } from '@laomao800/vue-listview'

@Component
export default class FilterButtonPreview extends Vue {
  @Prop({ type: String }) public icon!: FilterButton['icon']
  @Prop({ type: String }) public type!: FilterButton['type']
  @Prop({ type: Boolean }) public plain!: FilterButton['plain']
  @Prop({ type: String }) public text!: FilterButton['text']
}
</script>
