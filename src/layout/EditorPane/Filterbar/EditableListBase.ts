import { Vue } from 'vue-property-decorator'

interface CreateType {
  data: any
  insertAfter: number
}

interface UpdateType {
  updateIndex: number
  data: any
}

export default class EditableListBasic extends Vue {
  public createHandler(payload?: { data: any; insertAfter?: number }) {
    console.warn('createHandler 未实现')
  }
  public updateHandler(payload: { updateIndex: number; data: any }) {
    console.warn('updateHandler 未实现')
  }
  public deleteHandler(deleteIndex: number): void {
    console.warn('deleteHandler 未实现')
  }

  constructor() {
    super()
    this.createItem = this.createItem.bind(this)
  }

  createItem() {
    this.createHandler()
    // 此处 nextTick 无效，需使用 setTimeout 避免过快触发关闭弹出编辑组件
    setTimeout(() => {
      const editors: any = this.$refs.fieldEditor
      const editor = editors[editors.length - 1]
      editor.show()
    })
  }

  copyItem(data: any, insertAfter: number) {
    this.createHandler({
      data,
      insertAfter
    })
  }

  updateItem(updateIndex: number, data: any) {
    this.updateHandler({
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
      this.deleteHandler(deleteIndex)
    } catch (e) {}
  }
}
