<template>
  <div>
    <div id="synced-charts" style="background-color: white;">
      <apexchart
        id="candle"
        type="candlestick"
        height="360"
        :options="chartOptions"
        :series="series"
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
      series: this.companyData,
      chartOptions: {
        chart: {
          height: 290,
          group: "social",
          type: 'line',
          id: "chart",
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        colors: ['#2E93fA', '#66DA26', '#546E7A'],
        xaxis: {
          type: "datetime",
          labels: {
            show: true,
            formatter: function (val) {
              return moment(val).format("DD/MM/YYYY");
            },
          },         
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (val) {
              return val.toFixed(2);
            },
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
          type: "datetime",
          labels: {
            formatter: function (val) {
              return moment(val).format("DD/MM/YYYY");
            },
          },
        },
        yaxis: {
          labels: {
            show: true,
          },
        },
      },
    };
  },
};
</script>