<script lang="ts">
import { CreateElement } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ContainerMixin } from 'vue-slicksort'

@Component({
  // @ts-ignore
  mixins: [ContainerMixin]
})
export default class SortableList {
  @Prop({ type: String, default: 'div' })
  public element!: string

  render(h: CreateElement) {
    // @ts-ignore
    return h(this.element, this.$slots.default)
  }
}
</script>
