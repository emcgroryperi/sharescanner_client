<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-3">
        <company-list
          :companies="companies"
          @active-symbol="(symbol) => updateSelection(symbol)"
          :last_updated="last_updated"
        ></company-list>
        <material-button color="success" :fullWidth="true"
        @click="updateCompanies">Update Data (Be sparing)</material-button>
      </div>
      <div class="col-9">
        <company-details v-if="activeSymbol != ''" :symbol="activeSymbol"></company-details>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton";
import { HTTP } from "../http-common";
import moment from "moment";
import CompanyDetails from "@/views/components/CompanyDetails";
import CompanyList from "@/views/components/CompanyList";

export default {
  data() {
    return {
      name: "companies",
      api_loaded: false,
      companies: [],
      activeSymbol: "",
      last_updated: "Loading...",
    };
  },
  components: {
    MaterialButton,
    CompanyDetails,
    CompanyList,
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
      console.log(
        moment(this.companies[0].last_updated, "YYYY-MM-DD").toDate()
      );
    });
  },

  methods: {
    updateSelection(symbol) {
      this.activeSymbol = symbol;
      console.log(this.activeSymbol);
    },
    updateCompanies() {
      console.log('updating')
      HTTP.get("update_companies")
      .then(console.log('Finished Updating'))
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