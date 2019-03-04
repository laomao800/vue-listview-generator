<template>
  <div>
    <ElRow :gutter="16">
      <ElCol :span="8">
        <FilterButtons/>
      </ElCol>
      <ElCol :span="10">
        <FilterFields/>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FilterButtons from './FilterButtons.vue'
import FilterFields from './FilterFields.vue'

@Component({
  components: {
    FilterButtons,
    FilterFields
  }
})
export default class Filterbar extends Vue {}
</script>
