<template>
    <div class="viewer-body">
      <div class="row">
        <div class="flex md2">
          <companies-list
            :selectedCompany="selected"
            @newSelection="(symbol) => changeSelected(symbol)"
          >
          </companies-list>
        </div>
        <div class="flex md9">
          <company-page
            :key="this.selected"
            v-if="this.selected != ''"
            :symbol="selected"
          ></company-page>
        </div>
      </div>
    </div>
</template>

<script>
import CompaniesList from "./CompaniesList";
import CompanyPage from "./CompanyPage";


export default {
  components: {
    CompaniesList,
    CompanyPage,
  },

  data() {
    return {
      selected: "",
    };
  },

  methods: {
    changeSelected(newCompanySymbol) {
      this.selected = newCompanySymbol;
    },
  },
};
</script>


<style>



</style>