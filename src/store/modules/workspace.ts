import { version } from '@/../package.json'
import { version as listviewVersion } from '@laomao800/vue-listview/package.json'

export const mapFields = true

export const state = {
  version,
  listviewVersion,

  // DataSource Pane
  requestType: 'default',
  setContentDataMap: false,
  setResolveResponseErrorMessage: false,
  setValidateResponse: false,
  setContentMessage: false
}
