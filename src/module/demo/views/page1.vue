<template>
  <d2-container>
    <template slot="header">{{ header }}</template>
    {{ response }}
  </d2-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DemoApi from '../api/demo'

@Component
export default class Page1 extends Vue {
  header: string = 'Page 1 header'
  response: any = 'loading'

  mounted () {
    DemoApi.demoApi().then(resp => {
      this.response = resp
    })
  }
}
</script>
