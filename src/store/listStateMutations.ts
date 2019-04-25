import { uuid } from '@/utils'

interface MutateList {
  stateProp: string
  data?: any
}
interface AddMutate extends MutateList {
  insertAfter?: number
}
interface UpdateMutate extends MutateList {
  updateIndex: number
}
interface DeleteMutate extends MutateList {
  deleteIndex: number
}

export function LIST_STATE_ADD(state: any, payload: AddMutate) {
  const { stateProp, data, insertAfter = -1 } = payload
  const target = state[stateProp]
  if (target) {
    const newData = { id: uuid(), data }
    if (insertAfter > -1) {
      target.splice(insertAfter + 1, 0, newData)
    } else {
      target.push(newData)
    }
  }
}

export function LIST_STATE_UPDATE(state: any, payload: UpdateMutate) {
  const { stateProp, data, updateIndex } = payload
  const target = state[stateProp]
  if (target) {
    target[updateIndex!].data = data
  }
}

export function LIST_STATE_DELETE(state: any, payload: DeleteMutate) {
  const { stateProp, deleteIndex } = payload
  const target = state[stateProp]
  if (target) {
    target.splice(deleteIndex, 1)
  }
}
