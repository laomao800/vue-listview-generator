<template>
  <div :class="$style.wrap">
    <Listview v-if="configLoaded" v-bind="config" />
    <div :class="$style.toolbox">
      <ElTooltip effect="dark" content="检查配置" placement="top">
        <button @click="checkCurConfig">
          <SvgIcon name="code" />
        </button>
      </ElTooltip>
      <ElTooltip effect="dark" content="退出预览" placement="top">
        <button @click="$store.dispatch('preview', false)">
          <SvgIcon name="close" />
        </button>
      </ElTooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapFields } from 'vuex-map-fields'
import { prettify } from '@/utils'
import CodeDialogService from '@/service/CodeDialog'

@Component({
  // @ts-ignore
  components: {
    Listview: () => import('@laomao800/vue-listview')
  }
})
export default class Preview extends Vue {
  public configLoaded = false
  public config = {}

  async created() {
    this.config = await this.$store.dispatch('project/getProjectConfig')
    this.configLoaded = true
  }

  async checkCurConfig() {
    // prettier-ignore
    const configString = await this.$store.dispatch('getConfigString')
    const content = prettify(`const listviewProps = ${configString}`)
    const configDialog = CodeDialogService({
      content,
      lang: 'javascript',
      width: '80%',
      height: 500,
      readonly: true,
      title: '检查配置',
      buttons: [{ text: '关闭', click: () => configDialog.hide() }]
    })
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.wrap {
  height: 100%;
  overflow: auto;
  background-color: #fff;
}

.toolbox {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 2000;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 6px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 50px;
  opacity: 0.5;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    opacity: 1;
  }

  button {
    width: 36px;
    height: 36px;
    padding: 1px;
    margin: 0 6px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: none;
    border-radius: 100%;
    outline: none;
    transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
