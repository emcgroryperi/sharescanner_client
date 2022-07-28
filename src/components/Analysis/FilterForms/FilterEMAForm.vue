<template>
    <div class="filter-body" style="width: 300px;">
        <div class="row">
            <div class="flex md5">
                <va-input 
                    v-model="short_ema" 
                    label="Short EMA"
                    :rules="[(v) => parseInt(v) > 0 && parseInt(v) < parseInt(this.long_ema) || `Number must be between 0 and long ema`]"
                    outline>
                </va-input>
            </div>
            <div class="flex md5">
                <va-input 
                    v-model="long_ema" 
                    label="Long EMA"
                    :rules="[(v) => parseInt(v) > parseInt(this.short_ema) && parseInt(v) > 0 || `Number must be greater than short ema`]"
                    outline>
                </va-input>
            </div>
            <div class="flex md2">
                <va-button @click="addFilter()">
                    Add Filter
                </va-button>
            </div>
        </div>        
        

    </div>
</template>

<script>

import {VaInput, VaButton} from "vuestic-ui";


export default {
    props: {

    },

    components: {
        VaButton,
        VaInput
    },

    data() {
        return {
            short_ema: '10',
            long_ema: '50'

        };
    },

    methods: {
        addFilter() {
            // const obj = `{'filter': 'EMA crossover', 'short_ema': ${this.short_ema}, 'long_ema': ${this.long_ema}}`;
            const obj = {'key': `EMA_${this.short_ema}_${this.long_ema}`,  'filter': 'EMA crossover', 'short_ema': this.short_ema, 'long_ema': this.long_ema};
            console.log(obj)
            this.$emit('newFilter', obj)
        }
    }

};
</script>

<style scoped>

.filter-body {
    background-color: #4e6e5d;
}

</style>