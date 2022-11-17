<template>
  <div class="myrow">
    <div class="filter_label">
      <h6 class="mb-0 text-sm">Bollinger Bands</h6>
    </div>
    <div class="myfield"></div>
    <div class="mybutton">
        <material-button>Add</material-button>
    </div>
  </div>
</template>



<script>
import MaterialButton from "@/components/MaterialButton";

export default {
  props: {
    filter_name: { type: String, required: true },
  },

  components: {
    MaterialButton,
  },
};
</script>

<style>

</style>