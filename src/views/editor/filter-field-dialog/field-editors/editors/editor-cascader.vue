<template>
  <el-form
    ref="form"
    :model="fieldConfig"
    :rules="rules"
    size="small"
    label-width="120px"
  >
    <field-preview
      :field-type="fieldType"
      :field-config="fieldConfig"
    />

    <editor-common-form-item
      :field-type="fieldType"
      :field-config="fieldConfig"
      :width-placeholder="180"
    />
  </el-form>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Vue, Prop } from 'vue-property-decorator'
import fieldEditorMixin from './field-editor-mixin'

@Component({
  mixins: [fieldEditorMixin]
})
export default class EditorCascader extends mixins(fieldEditorMixin) {
  @Prop({ type: Array, default: () => [] })
  public options!: object[]
}
</script>
