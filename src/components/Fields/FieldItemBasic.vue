<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FieldItemBasic extends Vue {
  @Prop({ type: String, default: '' }) public icon!: string
  @Prop({ type: String, default: '' }) public title!: string
  @Prop({ type: Boolean, default: false }) public static!: boolean

  public $style: any
  public $refs: any
  public active: boolean = false

  get isPopField() {
    return this.$slots.pop
  }

  hidePopover() {
    const popover = this.$refs.popover
    if (popover) {
      popover.showPopper = false
    }
  }

  updatePopper() {
    const popover = this.$refs.popover
    if (popover) {
      popover.updatePopper()
    }
  }

  render() {
    const fieldItem = (
      <div
        class={[
          'field-item',
          this.$style.field,
          this.active && this.$style['field--active'],
          this.static && this.$style['field--static']
        ]}
        on-mouseleave={() => (this.active = false)}
      >
        {(this.$slots.icon || this.icon) && (
          <div class={this.$style.icon}>
            {this.$slots.icon || (
              // @ts-ignore
              <SvgIcon name={this.icon} />
            )}
          </div>
        )}

        <div class={this.$style.title}>{this.$slots.title || this.title}</div>

        {this.$slots.default && (
          <div class={this.$style.right}>{this.$slots.default}</div>
        )}

        {this.isPopField && (
          <div class={this.$style.ext}>
            {
              // @ts-ignore
              <SvgIcon name="next" />
            }
          </div>
        )}
      </div>
    )

    return this.isPopField ? (
      // @ts-ignore
      <ElPopover
        ref="popover"
        placement="right"
        trigger="hover"
        transition=""
        on-show={() => (this.active = true)}
        on-hide={() => (this.active = false)}
      >
        {this.$slots.pop}
        <template slot="reference">{fieldItem}</template>
        {/*
          // FIXME: TS JSX 内对全局组件名会报: Cannot find name 'ElPopover'
          // @ts-ignore */}
      </ElPopover>
    ) : (
      fieldItem
    )
  }
}
</script>

<style lang="less" module>
@import url('~@/style/theme.less');

.field {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 28px;
  padding: 0 12px;
  font-size: 14px;
  line-height: 120%;
  color: #666;
  user-select: none;
  outline: none;
  transition: background-color 0.12s;

  &:not(&--static) {
    cursor: pointer;
  }
  &--active,
  &:not(&--static):hover {
    background-color: @color-gray-light-3;
  }

  .icon {
    margin-right: 8px;
    font-size: 16px;
  }
  .title {
    flex: 1 1 auto;
  }
  .right {
    flex-shrink: 0;
    margin-left: auto;
  }
  .ext {
    flex-shrink: 0;
    margin-left: auto;
    font-size: 12px;
    color: #aaa;
  }
  .right + .ext {
    margin-left: 8px;
  }
}
</style>

<style lang="less">
.field-item {
  .el-switch {
    transform: scale(0.8);
    transform-origin: 100% 50%;
  }
  .el-radio-group {
    padding: 5px 0;
  }
  .el-radio-button__inner {
    padding: 5px 10px;
  }
}
</style>
