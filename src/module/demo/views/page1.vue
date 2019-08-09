<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    {{response}}
  </d2-container>
</template>

<script>

import DemoApi from '../api/demo'

export default {
  name: 'page1',
  data () {
    return {
      response: 'loading'
    }
  },
  mounted () {
    DemoApi.demoApi().then(resp => {
      this.response = resp
    })
  }
}
</script>
