<template>
  <ChartTradingView :unique-id="uniqueId" :options="options" />
</template>

<script>

import ChartTradingView from "./ChartTradingView.vue";
export default {
  name: "TradingViewItem",
  components: {ChartTradingView},
  props: {
    symbol: {
      type: String,
      default: ''
    },
    uniqueId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      options: {
        theme: 'dark',
        width: 300,
        height: 300,
        symbol: this.symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        style: '9',
        locale: 'en',
        hide_legend: true,
        allow_symbol_change: false,
        enable_publishing: false,
        save_image: false,
        container_id: this.uniqueId
      }}
  },

  watch: {
    symbol() {
      this.options = {
        theme: 'dark',
        width: 300,
        height: 300,
        symbol: this.symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        style: '9',
        locale: 'en',
        hide_legend: true,
        allow_symbol_change: false,
        enable_publishing: false,
        save_image: false,
        container_id: this.uniqueId
      }
    }
  }
}
</script>

<style scoped>
</style>
