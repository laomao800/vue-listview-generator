<template>
  <div>
    <slot/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ContainerMixin } from 'vue-slicksort'

@Component({
  // @ts-ignore
  mixins: [ContainerMixin]
})
export default class SortableList {}
</script>
