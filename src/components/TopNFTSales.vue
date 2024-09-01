<template>
    <div></div>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
    name: "TopNFTSales",
    props: {
        topXSales: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const store = useStore();

        onBeforeMount(() => {
            store.dispatch("getTopXSoldNFTs");
        });

        const sortedTopSales = computed(() => {
            return [...props.topXSales];
        });

        return {
            sortedTopSales,
        };
    },
};
</script>
