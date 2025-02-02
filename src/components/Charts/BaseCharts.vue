<template>
  <div :class="base.container" ref="ele" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import echarts, { ECharts, EChartOption } from 'echarts'
declare global {
  interface Window {
    attachEvent(type: string, callback: any): void
    detachEvent(type: string, callback: any): void
  }
}
interface EchartsInitOption {
  devicePixelRatio?: number
  renderer?: string
  width?: number | string
  height?: number | string
}
@Component
export default class BaseChart extends Vue {
  private echartsInstance!: ECharts
  private _resizeHanlder: any
  @Prop() private ec!: ECharts
  @Prop() private option!: EChartOption
  @Prop({ default: 'vintage' }) private theme?: string
  @Prop() private initOption?: EchartsInitOption
  @Watch('option', { deep: true })
  private optionChanged(v: EChartOption, oldV: EChartOption) {
    this.renderEcharts()
  }
  private resizeEventHandler(): void {
    this.echartsInstance.resize()
  }
  private init() {
    const me = this
    if (this.option) {
      this.echartsInstance = echarts.init(this.$refs.ele as HTMLDivElement, this.theme, this.initOption)
      this.$emit('update:ec', this.echartsInstance)
      if (window.addEventListener) {
        window.addEventListener('resize', this.resizeEventHandler, false)
      } else if (window.attachEvent) {
        window.attachEvent('resize', me.resizeEventHandler)
      }

      this.echartsInstance.on('click', (...args) => {
        this.$emit('handlerClick', ...args)
      })
    }
  }
  private renderEcharts() {
    if (this.option && this.echartsInstance) {
      this.echartsInstance.setOption(this.option, true)
      this.$emit('instance', this.echartsInstance)
    }
  }
  private mounted() {
    this.init()
    this.renderEcharts()
  }
  private destoryed() {
    this.$emit('instance', null)
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.resizeEventHandler, false)
    } else if (window.detachEvent) {
      const that = this
      window.detachEvent('resize', that.resizeEventHandler)
    }
    this.echartsInstance.dispose()
  }
}
</script>

<style module="base">
.container {
  min-height: 100px;
  min-width: 100px;
  width: 100%;
  height: 100%;
}
</style>
