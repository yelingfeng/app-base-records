<template>
  <div id="app">
    <Layout />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Layout from '@/views/Layout.vue'
@Component({
  components: {
    Layout
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fafbff;
  height: 100%;
}
</style>
