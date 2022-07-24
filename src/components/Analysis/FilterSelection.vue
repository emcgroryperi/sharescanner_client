<template>
    <div class="filter-body">

            <h2>Filter Selection</h2>

            <va-form 
                tag="form">

                <va-input 
                    label="username"
                    v-model="username">
                </va-input>

            </va-form>

    </div>
</template>

<script>

import {VaForm, VaInput} from "vuestic-ui";


export default {
    props: {

    },

    components: {
        VaForm,
        VaInput
    },

    data() {
        return {

        };
    },

};
</script>

<style scoped>

.filter-body {
    background-color: #4e6e5d;
}

</style>