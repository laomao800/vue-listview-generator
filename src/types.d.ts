import { Props } from '@laomao800/vue-listview'

interface UpdatePayload {
  key: keyof Props
  value: Props[keyof Props]
}

type updateConfigFunc = ({ key, value }: UpdatePayload) => void

export { updateConfigFunc }
