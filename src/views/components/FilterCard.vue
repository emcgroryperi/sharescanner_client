<template>
  <div class="row">
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
          <div class="table-responsive p-0 mytable mb-4" v-if="current_filters.length!=0">
            <table class="table align-items-center mb-0">
              <tbody>
                <ul class="navbar-nav filtered">
                  <div v-for="filter in current_filters" :key="filter.id">{{filter.label}}</div>
                  <material-button
                    
                    color="success"
                    :fullWidth="true"
                    @click="clearFilters"
                  >Clear</material-button>
                </ul>
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
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton";
import VolumeButton from "@/views/components/AnalysisButtons/VolumeButton";
import EmaButton from "@/views/components/AnalysisButtons/EmaButton";
// import BollingerButton from '@/views/components/AnalysisButtons/BollingerButton';
import {HTTP} from '../../http-common.js';

export default {
  data() {
    return {
      current_filters: [],
      crossovers: []
    };
  },
  components: {
    MaterialButton,
    VolumeButton,
    EmaButton,
    // BollingerButton
  },

  methods: {
    addFilter(filter) {
      if (!this.current_filters.some((e) => e.key == filter.key)) {
        this.current_filters.push(filter);
      }
      console.log(this.current_filters);
    },
    clearFilters() {
      this.current_filters = [];
      this.$emit('filter-cleared')
    },
    applyFilters() {
      console.log("requesting");
      HTTP.get('get_csrf_token')
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
            this.$emit('filter-complete', this.crossovers)
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
</style>