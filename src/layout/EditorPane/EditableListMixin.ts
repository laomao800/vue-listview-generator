import { Vue, Component, Mixins } from 'vue-property-decorator'

export interface CreatePayload {
  stateProp: string
  data: any
  insertAfter?: number
}
export interface UpdatePayload {
  stateProp: string
  data: any
  updateIndex: number
}
export interface DeletePayload {
  stateProp: string
  deleteIndex: number
}

@Component
class EditableListMixin extends Vue {
  public createHandler(payload?: CreatePayload) {
    throw new Error('createHandler 未实现')
  }
  public updateHandler(payload: UpdatePayload) {
    throw new Error('updateHandler 未实现')
  }
  public deleteHandler(payload: DeletePayload) {
    throw new Error('deleteHandler 未实现')
  }

  public stateField: string = ''
  public defaultData: any = {}

  createItem() {
    this.createHandler({
      stateProp: this.stateField,
      data: this.defaultData
    })
    // 此处 nextTick 无效，需使用 setTimeout 避免过快触发关闭弹出编辑组件
    setTimeout(() => {
      const editors: any = this.$refs.itemEditors
      if (Array.isArray(editors)) {
        const editor = editors[editors.length - 1]
        editor.show()
      }
    })
  }

  copyItem(data: any, insertAfter: number) {
    this.createHandler({
      stateProp: this.stateField,
      data,
      insertAfter
    })
  }

  updateItem(updateIndex: number, data: any) {
    this.updateHandler({
      stateProp: this.stateField,
      updateIndex,
      data
    })
  }

  async deleteItem(deleteIndex: number) {
    try {
      await this.$confirm('确认删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      this.deleteHandler({
        stateProp: this.stateField,
        deleteIndex
      })
    } catch (e) {}
  }
}

export default Mixins(EditableListMixin)
