import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $ls: any
    $ss: any
  }
}
