<template>
  <keep-alive :exclude="['Preview']">
    <Editor v-if="!isPreview"/>
    <Preview v-else/>
  </keep-alive>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Editor from '@/layout/Editor.vue'
import { debounce } from 'decko'

@Component({
  components: {
    Editor,
    Preview: () => import('@/layout/Preview.vue')
  }
})
export default class App extends Vue {
  get isPreview() {
    return this.$store.state.isPreview
  }

  @Watch('$store.state.workspace', { deep: true })
  @Watch('$store.state.project', { deep: true })
  @debounce
  stateChanged() {
    this.$store.dispatch('saveProject')
  }

  created() {
    // 尝试加载浏览器缓存内的项目数据
    this.$store.dispatch('loadProject')
  }
}
</script>
