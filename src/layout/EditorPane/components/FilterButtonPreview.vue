<template>
  <div style="padding:5px 10px;pointer-events: none;">
    <ElButton :type="type" :icon="icon" :plain="plain">{{ text }}</ElButton>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FilterButton } from '@laomao800/vue-listview'

@Component
export default class FilterButtonPreview extends Vue {
  @Prop({ type: String, default: '' })
  public icon!: FilterButton['icon']

  @Prop({ type: String, default: 'default' })
  public type!: FilterButton['type']

  @Prop({ type: Boolean, default: false })
  public plain!: FilterButton['plain']

  @Prop({ type: String, default: '' })
  public text!: FilterButton['text']
}
</script>
