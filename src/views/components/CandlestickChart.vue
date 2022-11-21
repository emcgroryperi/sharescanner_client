<template>
  <div>
    <br/>
    <vue-trading-view :options="options" :key="symbol" />
    <br/>
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view/src/vue-trading-view";

export default {
  props: {
    companyData: Array,
    symbol: String,
    options: Object
  },

  data() {
    return {};
  },

  components: {
    VueTradingView,
  },


  mounted() {
    console.log(this.options);
  },
};
</script>