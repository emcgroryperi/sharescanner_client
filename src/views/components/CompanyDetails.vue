<template>
  <div class="card my-4">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
        <h6 class="text-white text-capitalize ps-3">{{ name }} ({{ formatSymbol }})</h6>
      </div>
    </div>
    <slot></slot>
    <br />
    <candlestick-chart
      v-if="render"
      :key="symbol"
      :companyData="plots"
      :companyVolume="this.getVolume"
    ></candlestick-chart>
    <div class="card-body px-0 pb-2">
      <p class="mb-0 text-sm" style="text-align: center;">Updated: {{ last_updated }}</p>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../http-common";
import moment from "moment";
import CandlestickChart from "@/views/components/CandlestickChart";
import { get_SMA, get_BBands, get_EMA } from "@/views/../analysis.js";

export default {
  name: "ChartHolderCard",
  props: {
    symbol: { required: true, type: String },
    filters: Object,
  },
  components: {
    CandlestickChart,
  },

  data() {
    return {
      name: "Loading...",
      market_cap: 0,
      exchange: "Loading...",
      last_updated: "Loading...",
      ochlv: [],
      render: false,
      plots: [],
    };
  },

  // Fetches companies when created
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.render = false;
      console.log("Querying database for " + this.formatSymbol);
      HTTP.get("company/" + this.formatSymbol)
        .then((response) => {
          this.name = response.data.company.name;
          this.market_cap = response.data.company.market_cap;
          this.last_updated = moment(response.data.company.last_updated).format(
            "ddd, ll"
          );
          this.exchange = response.data.company.exchange;
          this.ochlv = response.data.data;
          this.render = true;
          this.plots = [];
          this.plots.push({
            name: "candle",
            type: "candlestick",
            data: this.formatData,
          });
          console.log("Data retrieved");

          if (this.filters && this.filters.length != 0) {
            console.log(this.filters);
            for (const filter of this.filters) {
              if (filter.filter == "EMA crossover") {
                this.getEMA(filter.short_ema);
                this.getEMA(filter.long_ema);
              }
            }
          }
          this.getBBands(20, 2);
        })
        .catch((e) => {
          console.log(e);
          this.errors.push(e);
        });
    },
    getSMA(period) {
      get_SMA(this.formatData, period);
      // this.plots.push(get_SMA(this.formatData, period));
      // this.plots.push(get_SMA(this.formatData, 50));
    },
    getEMA(period) {
      this.plots.push(get_EMA(this.formatData, period));
    },
    getBBands(period, std) {
      this.plots.push(get_BBands(this.formatData, period, std).upper);
      this.plots.push(get_BBands(this.formatData, period, std).lower);
    },
  },

  watch: {
    symbol: function () {
      this.getData();
    },
  },

  computed: {
    latestDate() {
      var dt = moment(String(this.last_updated)).format("DD/MM/YYYY");
      if (dt != "Invalid Date") return dt;
      return "Loading...";
    },
    formatSymbol() {
      return this.symbol.substring(0, this.symbol.indexOf("."));
    },
    formatData() {
      var newData = [];

      for (let i = 0; i < this.ochlv.length; i++) {
        newData.push({
          x: moment(this.ochlv[i].date, "YYYY-MM-DD").toDate(),
          y: [
            this.ochlv[i].open,
            this.ochlv[i].high,
            this.ochlv[i].low,
            this.ochlv[i].close,
          ],
        });
      }
      return newData;
    },
    getVolume() {
      var newData = [];
      for (let i = 0; i < this.ochlv.length; i++) {
        newData.push({
          x: moment(this.ochlv[i].date, "YYYY-MM-DD").toDate(),
          y: this.ochlv[i].volume,
        });
      }
      return newData;
    },
  },
};
</script>

<style scoped>
.company-details {
  height: 15%;
}
</style>
