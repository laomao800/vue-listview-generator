import { version } from '@/../package.json'
import { version as listviewVersion } from '@laomao800/vue-listview/package.json'

export const mapFields = true

function getInitialState() {
  return {
    version,
    listviewVersion,

    // DataSource Pane
    requestType: 'default',
    setContentDataMap: false,
    setResolveResponseErrorMessage: false,
    setValidateResponse: false,
    setContentMessage: false
  }
}

export const state = getInitialState()

export const actions = {
  getInitialState
}
