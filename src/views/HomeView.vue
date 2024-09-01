<template>
    <div
        class="flex mx-auto py-6 flex-col justify-center items-center space-y-4 w-full"
    >
        <BaseSalesData :sales="sales"></BaseSalesData>
        <TopNFTSales :topXSales="topXSales"></TopNFTSales>
    </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Tooltip, initTWE } from "tw-elements";
import BaseSalesData from "@/components/BaseSalesData.vue";
import TopNFTSales from "@/components/TopNFTSales.vue";

export default {
    name: "HomeView",
    components: {
        BaseSalesData,
        TopNFTSales,
    },
    setup() {
        const store = useStore();

        const sales = computed(() => store.getters.GET_SALES);
        const topXSales = computed(() => store.getters.GET_TOP_X_SALES);
        onMounted(() => {
            initTWE({ Tooltip });

            store.dispatch("getTopXSoldNFTs");
        });

        return { sales, topXSales };
    },
};
</script>
