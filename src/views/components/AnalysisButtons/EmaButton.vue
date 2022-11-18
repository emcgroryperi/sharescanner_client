<template>
  <div class="myrow">
    <div class="filter_label">
      <h6 class="mb-0 text-sm">EMA Crossover</h6>
    </div>
    <div class="myfield">
      <div class="myinput">
        <label for="short">Short:</label>
        <div class="input-group">
          <input v-model="short" id="short" type="number" class="form-control myinput" />
        </div>
      </div>
      <div class="myinput">
        <label for="long">Long:</label>
        <div class="input-group">
          <input v-model="long" id="long" type="number" class="form-control myinput" />
        </div>
      </div>
      <div class="myinput">
        <label for="age">Age:</label>
        <div class="input-group">
          <input v-model="age" id="age" type="number" class="form-control myinput" />
        </div>
      </div>
    </div>
    <div class="mybutton">
      <material-button @click="addFilter">Add</material-button>
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton";
// import MaterialInput from "@/components/MaterialInput";

export default {
  data() {
    return {
      short: 10,
      long: 20,
      age: 7,
    };
  },

  components: {
    MaterialButton,
    // MaterialInput,
  },

  methods: {
    addFilter() {
      const obj = {
        key: `EMA_${this.short}_${this.long}`,
        filter: `EMA crossover`,
        label: `EMA_${this.short}_${this.long}_${this.age}`,
        short_ema: this.short,
        long_ema: this.long,
        age: this.age,
      };
      this.$emit("new-filter", obj);
    },
  },
};
</script>

<style>
.filter_label {
  width: 20%;
  display: inline-block;
  text-align: left;
}

.myfield {
  display: inline-block;
  width: 250px;
}

.mybutton {
  text-align: right;
  display: inline-block;
  width: 20%;
}

.mylabel {
  width: 100px;
  display: inline-block;
}

.myinput {
  width: 30%;
  display: inline-block;
  padding-inline: 10px;
}

.myrow {
  text-align: center;
  /*the same margin which is every button have, it is for small screen, and if you have many buttons.*/
  margin-left: -10px;
  margin-right: -10px;
}
</style>