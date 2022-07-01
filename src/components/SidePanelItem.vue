<template> 

<p>{{symbol}}</p>

</template>

<script>

export default {
    probs: {
        symbol: { required: true, type: String }
    }
};
</script>

<style>
.selected {
    background-color: #23e066;
}
</style>