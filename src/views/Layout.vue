<template>
  <div :class="Layout.container">
    <h1>App Base Records</h1>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Layout extends Vue {
  private pageFlag = ''
  private isLogin = false
  private ip = ''
  mounted() {}
}
</script>

<style module="Layout">
.container {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
