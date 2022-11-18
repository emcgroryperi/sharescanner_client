<template>
  <div class="row">
    <loading :active="loading" :is-full-page="true"></loading>
    <div class="col-8">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
            <h6 class="text-white text-capitalize ps-3">Filters</h6>
          </div>
        </div>
        <div class="card-body px-0 pb-2">
          <div class="newfilter">
            <volume-button @new-filter="(filter) => addFilter(filter)"></volume-button>
          </div>
          <div class="newfilter">
            <ema-button @new-filter="(filter) => addFilter(filter)"></ema-button>
          </div>
          <!-- <div>
            <bollinger-button></bollinger-button>
          </div>-->
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
            <h6 class="text-white text-capitalize ps-3">Active Filters</h6>
          </div>
        </div>
        <div class="card-body px-0 pb-2">
          <p
            v-if="current_filters.length==0"
            class="mb-0 text-sm"
            style="text-align: center;"
          >No Filters Added</p>
          <div class="table-responsive p-0 mytable mb-4">
            <table class="table align-items-center mb-0">
              <tbody>
                <ul class="navbar-nav filtered">
                  <div v-for="filter in current_filters" :key="filter.id">{{filter.label}}</div>
                </ul>
                  <material-button 
                    v-if="current_filters.length!=0"
                    color="success"
                    :fullWidth="true"
                    @click="clearFilters"
                  >Clear</material-button>
              </tbody>
            </table>
          </div>
          <material-button
            v-if="current_filters.length!=0"
            color="success"
            :fullWidth="true"
            @click="applyFilters"
          >Submit</material-button>
        </div>
      </div>
    </div>
    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': loading}">
      <div class="lds-dual-ring"></div>
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton";
import VolumeButton from "@/views/components/AnalysisButtons/VolumeButton";
import EmaButton from "@/views/components/AnalysisButtons/EmaButton";
// import BollingerButton from '@/views/components/AnalysisButtons/BollingerButton';
import {HTTP} from '../../http-common.js';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  data() {
    return {
      current_filters: [],
      crossovers: [],
      loading: false,
    };
  },
  components: {
    MaterialButton,
    VolumeButton,
    EmaButton,
    Loading,
    // BollingerButton
  },

  methods: {
    addFilter(filter) {
      if (!this.current_filters.some((e) => e.key == filter.key)) {
        this.current_filters.push(filter);
      } 
      this.current_filters.forEach((element, i) => {
        return element.key == filter.key ? this.current_filters[i] = filter : element
      });
    },
    clearFilters() {
      this.current_filters = [];
      this.$emit('filter-cleared')
    },
    applyFilters() {
      console.log("requesting");
      this.$emit('filter-cleared')
      this.loading=true
      HTTP.get('get_csrf_token/')
        .then((response) => {
            return response.data.token
        }).then(token => {
            HTTP.post("scan_market/", {indicators: this.current_filters}, {headers: {'X-CSRFToken': token}})
            .then((response) => {
            console.log(response)
            console.log("Companies retrieved");
            return JSON.parse(response.data);
            })
            .then((data) => {
            this.crossovers = data.data;
            console.log(this.crossovers);
            this.loading=false
            this.$emit('filter-complete', this.crossovers, this.current_filters)
          })})
          ;
    },
  },
};
</script>

<style>
.active {
  color: red;
}

.mytable {
  overflow: auto;
  max-height: 50vh;
}

.filtered {
  text-align: center;
}

.newfilter {
  padding-top: 10px;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;
  
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
  
}

</style>