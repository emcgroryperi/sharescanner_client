<template>
  <div class="card my-4">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
        <h6 class="text-white text-capitalize ps-3">Companies</h6>
      </div>
    </div>
    <div class="card-body px-0 pb-2">
      <div class="table-responsive p-0 mytable mb-4">
        <table class="table align-items-center mb-0">
          <tbody>
            <ul class="navbar-nav">
              <div v-for="company in companies" :key="company.symbol">
                <material-button
                  :color="company.symbol == this.activeSymbol ? 'success' : 'light'"
                  v-on:click="updateSelection(company.symbol)"
                  :fullWidth="true"
                >{{company.symbol}}</material-button>
              </div>
            </ul>
          </tbody>
        </table>
      </div>
      <p class="mb-0 text-sm" style="text-align: center;">Updated: {{ last_updated }}</p>
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton";

export default {
  props: {
    companies: { required: true, type: Array },
  },

  data() {
    return {
      name: "companies",
      api_loaded: false,
      // companies: [],
      activeSymbol: "",
      last_updated: "Loading...",
    };
  },
  components: {
    MaterialButton,
    // CompanyDetails,
  },

  methods: {
    updateSelection(symbol) {
      this.activeSymbol = symbol;
      this.$emit("active-symbol", symbol);
      console.log(this.activeSymbol);
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
</style>