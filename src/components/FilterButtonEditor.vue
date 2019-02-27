<template>
  <ElPopover v-model="visible" placement="bottom" width="200" trigger="click" transition>
    <slot slot="reference">
      <SvgIcon name="more" style="color:#999"/>
    </slot>
    <div style="margin:-10px">
      <div class="config-field">
        <ElInput v-model="internalConfig.text"/>
      </div>
      <div class="config-field">
        <ButtonTypeSelect v-model="internalConfig.type" :plain="internalConfig.plain"/>
      </div>
      <div class="config-field">
        <span>线框型按钮</span>
        <ElSwitch v-model="internalConfig.plain"/>
      </div>
      <div class="config-field">
        <IconSelector v-model="internalConfig.icon"/>
      </div>
      <!--
        ---操作---
        - 复制
        - 删除
      -->
    </div>
  </ElPopover>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { FilterButton } from '@laomao800/vue-listview'
import { debounce } from 'decko'
import ButtonTypeSelect from '@/components/ButtonTypeSelect.vue'
import IconSelector from '@/components/IconSelector/index.vue'

@Component({
  components: {
    ButtonTypeSelect,
    IconSelector
  }
})
export default class FilterButtonEditor extends Vue {
  @Prop({ type: Object, default: () => ({}) }) public config!: FilterButton

  public visible: boolean = false
  public internalConfig: FilterButton = {}

  @Watch('config', { immediate: true })
  configChanged(newVal: FilterButton) {
    if (!_.isEqual(newVal, this.internalConfig)) {
      this.internalConfig = _.cloneDeep(newVal)
    }
  }

  @Watch('internalConfig', { deep: true })
  internalConfigChanged(newVal: FilterButton) {
    if (!_.isEqual(newVal, this.config)) {
      this.$emit('change', _.cloneDeep(newVal))
    }
  }

  @debounce
  syncConfig() {
    console.log('syncConfig')
    this.$emit('change', this.internalConfig)
  }

  show() {
    this.visible = true
  }
}
</script>
