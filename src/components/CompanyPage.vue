<template> 
<div v-if="render">
  <p>{{ name }}</p>
  <p>{{ market_cap }}</p>
  <p>{{ latestDate }}</p>
</div>


</template>

<script>
import {HTTP} from '../http-common';

import moment from 'moment';

export default {
  props: {
    icon: {required: true, type: String},
    render: {required: true, type: Boolean, default: false }
  },

  data() {
    return {
      name: 'Loading...',
      market_cap: 0,
      last_updated: 'Loading...',
      symbol: 'Loading...',
    }
  },

  watch: {
    icon: function() {
      console.log('Querying for one company')
      console.log(this.icon)
      HTTP.get('company/' + this.icon)
      .then(response => {
        this.name = response.data.company.name
        this.market_cap = response.data.company.market_cap
        this.last_updated = response.data.company.last_updated
        this.symbol = response.data.company.symbol
        console.log
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },

  // Fetches companies when created
  created() {
      console.log('Querying for one company')
      console.log(this.icon)
      HTTP.get('company/' + this.icon)
      .then(response => {
        this.name = response.data.company.name
        this.market_cap = response.data.company.market_cap
        this.last_updated = response.data.company.last_updated
        this.symbol = response.data.company.symbol
      })
      .catch(e => {
        this.errors.push(e)
      })

  },

  computed: {
    latestDate() {
      var dt = moment(String(this.last_updated)).format('DD/MM/YYYY');
      if (dt) 
        return dt
      return 'Loading...'
    }
  }
};
</script>