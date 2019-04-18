<template>
  <keep-alive :exclude="['Preview']">
    <Editor v-if="!isPreview"/>
    <Preview v-else/>
  </keep-alive>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Editor from '@/layout/Editor.vue'

@Component({
  components: {
    Editor,
    Preview: () => import('@/layout/Preview.vue')
  }
})
export default class App extends Vue {
  get isPreview() {
    return this.$store.state.app.isPreview
  }
}
</script>
