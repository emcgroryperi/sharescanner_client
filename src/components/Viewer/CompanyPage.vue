<template> 

<div>
  <h2>{{ name }} ({{symbol}})</h2>
  <p>Market Cap:{{ market_cap }}</p>
  <p>Last Updated on: {{ latestDate }}</p>
  <candlestick-chart v-if="render" :key="symbol" :companyVolume="this.getVolume" :companyData="this.formatData"></candlestick-chart>
</div>

</template>

<script>

import {HTTP} from '../../http-common';

import CandlestickChart from './CandlestickChart';

import moment from 'moment';


export default {
  props: {
    symbol: {required: true, type: String},
  },

  components: {
    CandlestickChart
  },

  data() {
    return {
      name: 'Loading...',
      market_cap: 0,
      exchange: 'Loading...',
      last_updated: 'Loading...',
      ochlv: [],
      render: false,
    }
  },

  watch: {
    symbol: function() {
      this.getData()
    }
  },

  // Fetches companies when created
  created() {
      this.getData()
  },

  methods: {
    getData() {
      this.render=false
      console.log('Querying database for ' + this.formatSymbol)
      HTTP.get('company/' + this.formatSymbol)
      .then(response => {
        this.name = response.data.company.name
        this.market_cap = response.data.company.market_cap
        this.last_updated = response.data.company.last_updated
        this.exchange = response.data.company.exchange
        this.ochlv = response.data.data
        this.render=true
        console.log('rendering')
      }) 
      .catch(e => {
        this.errors.push(e)
      })
    }
  },

  computed: {
    latestDate() {
      var dt = moment(String(this.last_updated)).format('DD/MM/YYYY');
      if (dt) 
        return dt
      return 'Loading...'
    },
    formatSymbol() {
      return this.symbol.substring(0, this.symbol.indexOf('.'));
    } ,
    formatData() {
        var newData = [];

        for (let i=0; i < this.ochlv.length; i++)  {
            newData.push({
                x: moment(this.ochlv[i].date, 'YYYY-MM-DD').toDate(),
                y: [this.ochlv[i].open, this.ochlv[i].high, this.ochlv[i].low, this.ochlv[i].close]
            })
        }

        console.log(newData)

        return newData
    },
    getVolume() {
      var newData = [];

        for (let i=0; i < this.ochlv.length; i++)  {
            newData.push({
                x: moment(this.ochlv[i].date, 'YYYY-MM-DD').toDate(),
                y: [this.ochlv[i].volume]
            })
        }

        console.log(newData)

        return newData
    },
    
    



  }
};
</script>