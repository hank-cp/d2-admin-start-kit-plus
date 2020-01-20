<template>
  <d2-container>
    <template slot="header">{{ header }}</template>
    {{ msg }}
  </d2-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Page3 extends Vue {
  header: String = 'Page 3 header'
  msg: String = 'Hello world from Typescript'
}
</script>
