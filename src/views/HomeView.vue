<template>
    <div
        class="flex mx-auto flex-col px-8 pb-10 justify-center items-center space-y-4 w-full relative md:px-[10%]"
    >
        <TopSection></TopSection>
        <BaseSalesData :sales="sales"></BaseSalesData>
        <TopNFTSales :topXSales="topXSales"></TopNFTSales>
        <SalePriceChart :groupedSales="groupedSales"></SalePriceChart>
        <TopBuyers :topXBuyers="topXBuyers"></TopBuyers>
        <FooterSection></FooterSection>
    </div>
    <LoaderComponent></LoaderComponent>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Tooltip, initTWE } from "tw-elements";
import BaseSalesData from "@/components/BaseSalesData.vue";
import TopNFTSales from "@/components/TopNFTSales.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SalePriceChart from "@/components/SalePriceChart.vue";
import TopSection from "@/components/TopSection.vue";
import TopBuyers from "@/components/TopBuyers.vue";
import FooterSection from "@/components/FooterSection.vue";

export default {
    name: "HomeView",
    components: {
        BaseSalesData,
        TopNFTSales,
        LoaderComponent,
        SalePriceChart,
        TopSection,
        TopBuyers,
        FooterSection,
    },
    setup() {
        const store = useStore();

        const sales = computed(() => store.getters.GET_SALES);
        const topXSales = computed(() => store.getters.GET_TOP_X_SALES);
        const topXBuyers = computed(() => store.getters.GET_TOP_X_BUYERS);
        const groupedSales = computed(() => store.getters.GET_GROUPED_SALES);
        onMounted(() => {
            initTWE({ Tooltip });

            store.dispatch("getTopXSoldNFTs");
            store.dispatch("computeGroupSales");
            store.dispatch("getTopXBuyers");
        });

        return { sales, topXSales, groupedSales, topXBuyers };
    },
};
</script>
