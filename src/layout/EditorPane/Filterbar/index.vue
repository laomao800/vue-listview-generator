<template>
  <div>
    <ElRow :gutter="16">
      <ElCol :span="8">
        <FilterButtons/>
      </ElCol>
      <ElCol :span="12">Filterbar</ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FilterButtons from './FilterButtons.vue'

@Component({
  components: {
    FilterButtons
  }
})
export default class Filterbar extends Vue {}
</script>
