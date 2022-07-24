<template>
  <div class="viewer-body">
    <div class="row">
      <div class="flex md12">
        <FilterSelection></FilterSelection>
      </div>
    </div>
    <div class="row">
      <div class="flex md12">
         <AnalysisResultsPage>  </AnalysisResultsPage> 
      </div>
    </div>
  </div>
</template>

<script>

import AnalysisResultsPage from "./AnalysisResultsPage.vue";
import FilterSelection from "./FilterSelection.vue";



export default {
  components: {
    AnalysisResultsPage,
    FilterSelection
  },

  data() {
    return {
      selected: "",
      filtersChosen: '',
      filters: [],
    };
  },

  methods: {
    changeSelected(newCompanySymbol) {
      console.log(newCompanySymbol)
      this.selected = newCompanySymbol;
    },
  },
};
</script>


<style>
</style>