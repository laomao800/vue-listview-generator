<template>
  <div id="app">
    <listview-editor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ListviewEditor from '@/views/editor/index.vue'
import './common.less'

@Component({
  components: {
    ListviewEditor
  }
})
export default class App extends Vue {}
</script>
