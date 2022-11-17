<template>
  <div class="myrow">
    <div class="filter_label">
      <h6 class="mb-0 text-sm">{{filter_name}}</h6>
    </div>
    <div class="myfield">
      <span class="text-xs font-weight-bold">100000000</span>
    </div>
    <div class="myfield">
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
.filter_label {
  width: 30%;
  display: inline-block;
  text-align: left;
}

.myfield {
  width: 150px;
  display: inline-block;
}

.myrow {
  text-align: center;
  /*the same margin which is every button have, it is for small screen, and if you have many buttons.*/
  margin-left: -10px;
  margin-right: -10px;
}
</style>