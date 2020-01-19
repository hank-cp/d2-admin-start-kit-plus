<template>
  <d2-container>
    <template slot="header">{{ header }}</template>
    {{ msg }}
  </d2-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Page2 extends Vue {
    header: String = 'Page 2 header'
    msg: String = 'Hello World'
}
</script>
