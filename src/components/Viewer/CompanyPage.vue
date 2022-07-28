<template>
<div class="company-body">
    <div class="company-content">
      <company-details
        :name="this.name"
        :market_cap="this.market_cap"
        :exchange="this.exchange"
        :last_updated="this.latestDate"
        :symbol="this.symbol"
      ></company-details>
      <candlestick-chart
        v-if="render"
        :key="symbol"
        :companyVolume="this.getVolume"
        :companyData="plots"
      ></candlestick-chart>
    </div>
</div>
</template>

<script>
import { HTTP } from "../../http-common";

import CandlestickChart from "./CandlestickChart";
import CompanyDetails from "./CompanyDetails";


import moment from "moment";

export default {
  props: {
    symbol: { required: true, type: String },
  },

  components: {
    CandlestickChart,
    CompanyDetails,
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

  watch: {
    symbol: function () {
      this.getData();
    },
  },

  // Fetches companies when created
  created() {
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
          this.last_updated = response.data.company.last_updated;
          this.exchange = response.data.company.exchange;
          this.ochlv = response.data.data;
          this.render = true;
          this.plots.push({
            name: "candle",
            type: "candlestick",
            data: this.formatData,
          });
          this.getEMA(10);
          this.getEMA(50);
          this.getBBands(20,2);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getSMA(period) {
      const SMA = require("technicalindicators").SMA;
      const formatted = this.formatData;
      const vals = formatted.map((value) => value.y[3]);
      const data = SMA.calculate({ period: period, values: vals });
      const newData = [];
      for (let i = vals.length - data.length; i < vals.length; i++) {
        newData.push({
          x: moment(this.ochlv[i].date, "YYYY-MM-DD").toDate(),
          y: data[data.length - vals.length + i],
        });
      }
      this.plots.push({ name: "SMA " + period, type: "line", data: newData });
    },
    getEMA(period) {
      const EMA = require("technicalindicators").EMA;
      const formatted = this.formatData;
      const vals = formatted.map((value) => value.y[3]);
      const data = EMA.calculate({ period: period, values: vals });
      const newData = [];
      for (let i = vals.length - data.length; i < vals.length; i++) {
        newData.push({
          x: moment(this.ochlv[i].date, "YYYY-MM-DD").toDate(),
          y: data[data.length - vals.length + i],
        });
      }
      this.plots.push({ name: "EMA " + period, type: "line", data: newData });
    },
    getBBands(period, std) {
      const BBands = require("technicalindicators").BollingerBands;
      const formatted = this.formatData;
      const vals = formatted.map((value) => value.y[3]);
      const data = BBands.calculate({ period: period, values: vals, stdDev: std });
      const upper = [];
      for (let i = vals.length - data.length; i < vals.length; i++) {
        upper.push({
          x: moment(this.ochlv[i].date, "YYYY-MM-DD").toDate(),
          y: data[data.length - vals.length + i]['upper'],
        });
      }

      const lower = [];
      for (let i = vals.length - data.length; i < vals.length; i++) {
        lower.push({
          x: moment(this.ochlv[i].date, "YYYY-MM-DD").toDate(),
          y: data[data.length - vals.length + i]['lower'],
        });
      }


      this.plots.push({ name: "Lower BBand " + period, type: "line", data: lower });
      this.plots.push({ name: "Upper BBand " + period, type: "line", data: upper });
    }
  },

  computed: {
    latestDate() {
      var dt = moment(String(this.last_updated)).format("DD/MM/YYYY");
      console.log(dt);
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
      console.log(this.ochlv[0].date);
      console.log(Date.parse(newData[0].x));
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

      // console.log(newData);

      return newData;
    },
  },
};
</script>

<style scoped>
.company-body {
  /* height: 90%; */
  padding: 1%;
}

.company-content {
  height: 83%;
  padding: 1%;
  background-color: #cfcfcf;
}
</style>