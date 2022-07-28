<template>
    <div class="filter-body" style="width: 300px;">
        <div class="row">
            <div class="flex md2">
                <va-button @click="addFilter()">
                    Add Filter
                </va-button>
            </div>
        </div>        
        

    </div>
</template>

<script>

import { VaButton} from "vuestic-ui";


export default {
    props: {

    },

    components: {
        VaButton,

    },

    data() {
        return {

        };
    },

    methods: {
        addFilter() {
            // const obj = `{'filter': 'EMA crossover', 'short_ema': ${this.short_ema}, 'long_ema': ${this.long_ema}}`;
            const obj = {'key': `volume`,  'filter': 'Volume Peaks'};
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