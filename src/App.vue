<template>
  <div id="app">
    <ListviewEditor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ListviewEditor from '@/views/Editor/index.vue'
import './common.less'

@Component({
  components: {
    ListviewEditor
  }
})
export default class App extends Vue {}
</script>
