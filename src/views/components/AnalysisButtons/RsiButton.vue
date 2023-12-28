<template>
  <div class="myrow">
    <div class="filter_label">
      <h6 class="mb-0 text-sm">RSI Thresholds</h6>
    </div>
    <div class="myfield"></div>
    <div class="mybutton">
      <material-button @click="addFilter">Add</material-button>
    </div>
  </div>
</template>



<script>
import MaterialButton from "@/components/MaterialButton";

export default {
  components: {
    MaterialButton,
  },

  methods: {
    addFilter() {
      const obj = {
        key: `rsi`,
        filter: "RSI Thresholds",
        label: "RSI Thresholds",
      };
      console.log(obj);
      this.$emit("new-filter", obj);
    },
  },
};
</script>
<style>

</style>