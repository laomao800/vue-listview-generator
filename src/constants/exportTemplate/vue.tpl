<template>
  <listview ref="listview" v-bind="listviewConfig" />
</template>

<script>
import Listview from '@laomao800/vue-listview'

export default {
  name: 'ListviewPage',
  components: {
    Listview
  },
  data() {
    return {
      listviewConfig: <%= listviewConfig %>
    }
  }
}
</script>
