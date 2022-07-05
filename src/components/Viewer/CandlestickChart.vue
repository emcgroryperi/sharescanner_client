<template>
  <div>
    <br />
    <br />
    <br />
    <div id="synced-charts">
      <apexchart
        id="candle"
        type="candlestick"
        height="400"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <apexchart
        id="bar"
        type="bar"
        height="160"
        :options="chartOptionsBar"
        :series="seriesBar"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import moment from "moment";

export default {
  props: {
    companyData: Array,
    companyVolume: Array,
  },

  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {
      series: [
        {
          name: "candle",
          data: this.companyData,
        },
      ],
      chartOptions: {
        chart: {
          height: 290,
          type: "candlestick",
          group: "social",
          id: "chart",
        },
        title: {
          text: "CandleStick Chart - Category X-axis",
          align: "left",
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          tooltip: {
            enabled: true,
          },
          type: "datetime",
          labels: {
            formatter: function (val) {
              return moment(val).format("DD/MM/YYYY");
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
      seriesBar: [
        {
          name: "volume",
          data: this.companyVolume,
        },
      ],
      chartOptionsBar: {
        chart: {
          height: 160,
          type: "bar",
          group: "social",
          id: "bar",
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
            colors: {
              ranges: [
                {
                  from: -1000,
                  to: 0,
                  color: "#F15B46",
                },
                {
                  from: 1,
                  to: 10000,
                  color: "#FEB019",
                },
              ],
            },
          },
        },
        stroke: {
          width: 0,
        },
        xaxis: {
          tooltip: {
            enabled: true,
          },
          type: "datetime",
          labels: {
            formatter: function (val) {
              return moment(val).format("DD/MM/YYYY");
            },
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
      },
    };
  },
};
</script>