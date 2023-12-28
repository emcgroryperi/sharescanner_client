<template>
  <div class="card my-4">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
        <h6 class="text-white text-capitalize ps-3">{{ name }} ({{ formatSymbol }})</h6>
      </div>
    </div>
    <slot></slot>
    <candlestick-chart :symbol="symbol" :options="getOptions"></candlestick-chart>
  </div>
</template>

<script>
import { HTTP } from "../../http-common";
import moment from "moment";
import CandlestickChart from "@/views/components/CandlestickChart";

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
  created() {
    this.getData()
  },

  watch: {
    symbol() {
      this.getData();
    },
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
          this.render = true;
          console.log("Data retrieved");

          if (this.filters && this.filters.length != 0) {
            console.log(this.filters);
            // for (const filter of this.filters) {
            //   if (filter.filter == "EMA crossover") {
            //   }
            // }
          }
        })
        .catch((e) => {
          console.log(e);
          this.errors.push(e);
        });
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
    getTheme() {
      console.log(this.$store.state.isDarkMode)
      return 'dark'
      // return this.$store.state.isDarkMode ? 'dark' : 'light'
    },
    getOptions() {
      return {
        symbol: this.chartSymbol,
        interval: "D",
        theme: this.getTheme,
        studies: [
          {
            id: "MAExp@tv-basicstudies",
            inputs: {
              length: 10,
            },
          },
          {
            id: "MAExp@tv-basicstudies",
            inputs: {
              length: 20,
            },
          },
          {
            id: "MAExp@tv-basicstudies",
            inputs: {
              length: 50,
            },
          },
          {
          id: "BB@tv-basicstudies"
          },
          {
          id: "RSI@tv-basicstudies"
          }
        ],
      };
    },
    chartSymbol() {
      return "ASX:" + this.symbol.substr(0, this.symbol.indexOf("."));
    },
  },
};
</script>

<style scoped>
.company-details {
  height: 15%;
}
</style>
