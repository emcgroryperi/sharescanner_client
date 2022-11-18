<template>
  <div class="container-fluid py-4">
    <div class="row">
      <filter-card 
        @filter-complete="(crossovers, filters) => selectCompanies(crossovers, filters)"
        @filter-cleared="this.filtered=false; this.activeSymbol=''"></filter-card>
    </div>

    <div class="row" v-if="filtered">
      <div class="col-3">
        <company-list 
        :companies="companies"
        :last_updated="last_updated"
        @active-symbol="(symbol) => updateSelection(symbol)"></company-list>
      </div>
      <div class="col-9">
        <company-details 
          v-if="activeSymbol != ''" :symbol="activeSymbol"
          :filters="this.filters">
          <div style="padding: 10px; text-align: center;">
            They Done Fucked Up
          </div>
        </company-details>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../http-common";
import moment from "moment";
import CompanyDetails from "@/views/components/CompanyDetails";
import CompanyList from "@/views/components/CompanyList";
import FilterCard from '@/views/components/FilterCard';

export default {
  data() {
    return {
      name: "companies",
      api_loaded: false,
      companies: [],
      data: [],
      activeSymbol: "",
      last_updated: "Loading...",
      filtered: false,
      filters: {},
    };
  },
  components: {
    CompanyDetails,
    CompanyList,
    FilterCard,
  },

  created() {
    HTTP.get("companies").then((response) => {
      console.log("Companies retrieved");
      this.companies = response.data;
      this.companies.sort((a, b) => {
        if (a.symbol > b.symbol) return 1;
        if (b.symbol > a.symbol) return -1;
        return 0;
      });
      this.api_loaded = true;
      this.last_updated = moment(this.companies[0].last_updated).format(
        "ddd, ll"
      );
    });
  },

  methods: {
    updateSelection(symbol) {
      this.activeSymbol = symbol;
      console.log(this.activeSymbol);
    },
    selectCompanies(crossovers, filters) {
      this.data = crossovers
      let temp = []
      for (let i=0; i<crossovers.length; i++) {
        temp.push({'symbol': crossovers[i][0], 'filter_type': crossovers[i][5], date:crossovers[i][1]})
      }
      this.companies = temp
      this.filters = filters
      this.filtered = true
    }
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
</style>