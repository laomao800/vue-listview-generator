<template>
  <ElPopover v-model="visible" placement="bottom" width="240" trigger="click" transition>
    <slot slot="reference">
      <span :class="$style.more">
        <SvgIcon name="more"/>
      </span>
    </slot>
    <div style="margin:-12px;padding:6px 0;">
      <FieldInput
        ref="focusInput"
        v-model="internalConfig.label"
        title="列头文本"
        placeholder="列头文本"
        maxlength="16"
      />

      <FieldInput v-model.number="internalConfig.width" title="列宽" type="number" clearable>
        <template slot="append">px</template>
      </FieldInput>

      <FieldDivider/>

      <FieldInput v-model="internalConfig.prop" title="内容属性名" placeholder="内容属性名" maxlength="16"/>

      <!-- <FieldButtonType v-model="internalConfig.type" :plain="internalConfig.plain"/> -->
      <!-- <FieldIcons title="按钮图标" v-model="internalConfig.icon"/> -->
      <FieldItemBasic title="对齐" static>
        <ElRadioGroup v-model="internalConfig.align" size="mini">
          <ElRadioButton :label="undefined">
            <SvgIcon name="align-left"/>
          </ElRadioButton>
          <ElRadioButton label="center">
            <SvgIcon name="align-center"/>
          </ElRadioButton>
          <ElRadioButton label="right">
            <SvgIcon name="align-right"/>
          </ElRadioButton>
        </ElRadioGroup>
      </FieldItemBasic>

      <FieldItemBasic title="固定列" static>
        <ElRadioGroup v-model="internalConfig.fixed" size="mini">
          <ElRadioButton :label="undefined">无</ElRadioButton>
          <ElRadioButton :label="true">左</ElRadioButton>
          <ElRadioButton label="right">右</ElRadioButton>
        </ElRadioGroup>
      </FieldItemBasic>

      <FieldItemBasic icon="gear" title="自定义文本格式">
        <span style="font-size:12px;color:#009EF7;">清除</span>
      </FieldItemBasic>

      <FieldDivider/>

      <FieldItemBasic icon="react" title="使用 JSX 内容" @click.native="useJsx = !useJsx">
        <ElSwitch :value="useJsx" size="mini"/>
      </FieldItemBasic>

      <FieldDivider/>

      <FieldItemBasic icon="copy" title="复制" @click.native="handleCopy"/>
      <FieldItemBasic icon="delete" title="删除" @click.native="handleDelete"/>
    </div>
  </ElPopover>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'decko'
import { FilterButton } from '@laomao800/vue-listview'

@Component
export default class TableColumnEditor extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  public config!: FilterButton

  @Prop({ type: Function, default: () => {} })
  public handleDelete!: () => void

  public $refs: any
  public visible: boolean = false
  public internalConfig: FilterButton = {}
  public useJsx = false

  @Watch('config', { immediate: true })
  configChanged(newVal: FilterButton) {
    if (!_.isEqual(newVal, this.internalConfig)) {
      this.internalConfig = _.cloneDeep(newVal)
    }
  }

  @Watch('internalConfig', { deep: true })
  internalConfigChanged(newVal: FilterButton) {
    if (!_.isEqual(newVal, this.config)) {
      this.syncConfig()
    }
  }

  @Watch('visible')
  async visibleChanged(newVal: boolean) {
    if (newVal) {
      await this.$nextTick()
      this.$refs.focusInput.focus()
      this.$refs.focusInput.$refs.input.select()
    }
  }

  @debounce
  syncConfig() {
    this.$emit('change', _.cloneDeep(this.internalConfig))
  }

  handleCopy() {
    this.$emit('copy', _.cloneDeep(this.internalConfig))
    this.visible = false
  }

  show() {
    this.visible = true
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.more {
  padding: 2px;
  color: #999;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background: @color-gray-light-2;
  }
}
</style>
