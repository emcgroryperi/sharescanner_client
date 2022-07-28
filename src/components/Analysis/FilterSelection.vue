<template>
    <div class="filter-body">

        <va-form tag="form">
            <va-card color="background"  style="padding:0.75rem;">
                <div class="row">
                    <div class="flex md2">
                        <div class="item">
                            <va-switch 
                                label="EMA" left-label
                                v-model="ema_crossovers"
                            ></va-switch>
                        </div>
                    </div>
                    <div class="flex md10" v-if="ema_crossovers">
                        <div class="item">
                            <FilterEMAForm @newFilter="(obj) => updateCurrentFilters(obj)"></FilterEMAForm>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="flex md2">
                        <div class="item">
                            <va-switch 
                                label="Volume" left-label
                                v-model="volume_peaks"
                            ></va-switch>
                        </div>
                    </div>
                    <div class="flex md10" v-if="volume_peaks" >
                        <div class="item">
                            <FilterVolumeForm @newFilter="(obj) => updateCurrentFilters(obj)"></FilterVolumeForm>
                        </div>
                    </div>
                </div>
            </va-card>



        </va-form>

    </div>
</template>

<script>

import FilterEMAForm from "./FilterForms/FilterEMAForm.vue";
import FilterVolumeForm from "./FilterForms/FilterVolumeForm.vue";

import { VaCard, VaForm, VaSwitch } from "vuestic-ui";

export default {
    props: {

    },

    components: {
        FilterEMAForm,
        FilterVolumeForm,
        VaCard,
        VaForm,
        VaSwitch
    },

    data() {
        return {
            ema_crossovers: false,
            current_filters: [],
            volume_peaks: false
        };
    },

    methods: {
        updateCurrentFilters(obj) {
            if (!this.current_filters.some(e => e.key == obj.key)) {
                this.current_filters.push(obj)
            }
            console.log(this.current_filters)
        }
    }

};

</script>

<style scoped>
.filter-body {
    background-color: #4e6e5d;
}

.va-select-dropdown__options-wrapper {
    position: relative;
}
</style>