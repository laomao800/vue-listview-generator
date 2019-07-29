<script>
import _ from 'lodash'

export default {
  abstract: true,

  name: 'ServiceDialog',

  data() {
    return {
      visible: false,
      title: '',
      content: '',
      width: '',
      buttons: [],
      onClosed: null,
      onFlowClosed: null
    }
  },

  methods: {
    handleButtonClick(button) {
      if (_.isFunction(button.click)) {
        button.click(this)
      }
    },
    handleClosed() {
      _.isFunction(this.onClosed) && this.onClosed(this)
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },
    hide() {
      this.visible = false
    }
  },

  render() {
    return (
      <ElDialog
        title={this.title}
        visible={this.visible}
        close-on-click-modal={false}
        width={this.width}
        class="dialog--fit-content"
        top="10vh"
        on={{
          closed: this.handleClosed,
          'update:visible': (val) => (this.visible = val)
        }}
      >
        {this.content}
        {this.buttons.length > 0 && (
          <slot slot="footer" name="footer">
            {this.buttons.map((button) => (
              <ElButton
                type={button.type}
                loading={button.loading}
                disabled={button.disabled}
                on-click={() => this.handleButtonClick(button)}
              >
                {button.text}
              </ElButton>
            ))}
          </slot>
        )}
      </ElDialog>
    )
  }
}
</script>

<style>
.dialog--fit-content .el-dialog {
  width: fit-content;
}
</style>
