<template>
  <div class="myrow">
    <div class="filter_label">
      <h6 class="mb-0 text-sm">Bollinger Bands</h6>
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
        key: `bband`,
        filter: "Bollinger Bands",
        label: "Bollinger Bands",
      };
      console.log(obj);
      this.$emit("new-filter", obj);
    },
  },
};
</script>
<style>

</style>