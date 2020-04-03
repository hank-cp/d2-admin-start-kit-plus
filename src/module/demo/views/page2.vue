<template>
  <d2-container>
    <template slot="header">{{ header }}</template>
    {{ msg }}
  </d2-container>
</template>

<script>
export default {
  name: 'page2',
  data() {
    return {
      header: 'Page 2 header',
      msg: 'Hello world from Javascript'
    }
  }
}
</script>
