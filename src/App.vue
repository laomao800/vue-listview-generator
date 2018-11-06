<template>
  <div id="app">
    <listview-editor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ListviewEditor from './listview-editor.vue'
import './common.less'

@Component({
  components: {
    ListviewEditor
  }
})
export default class App extends Vue {}
</script>
