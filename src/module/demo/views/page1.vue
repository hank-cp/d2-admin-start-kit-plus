<template>
  <d2-container>
    <template slot="header">{{ header }}</template>
    {{ response }}

    <h1>Vuex Test - {{ $store.state.demo.counter.count }}</h1>
    <el-button id="btn_inc" @click="$store.commit('demo/counter/increase')">Increase</el-button>
    <el-button id="btn_reset" @click="$store.commit('demo/counter/reset')">Reset</el-button>

  </d2-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DemoApi from '../api/demo'

@Component
export default class Page1 extends Vue {
  header: string = 'Page 1 header'
  response: any = 'loading'

  mounted() {
    DemoApi.demoApi().then(resp => {
      this.response = resp
    })
  }
}
</script>
