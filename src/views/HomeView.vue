<template>
    <div class="flex flex-col min-h-screen pb-6">
        <ErrorMessage
            v-if="getError.isError || sales.length < 1"
        ></ErrorMessage>
        <div
            class="flex-grow mx-auto flex flex-col px-8 pb-10 justify-start items-center space-y-4 w-full relative md:px-[10%]"
            v-else
        >
            <TopSection></TopSection>
            <BaseSalesData :sales="sales"></BaseSalesData>
            <TopNFTSales :topXSales="topXSales"></TopNFTSales>
            <SalePriceChart :groupedSales="groupedSales"></SalePriceChart>
            <TopBuyers :topXBuyers="topXBuyers"></TopBuyers>
        </div>

        <!-- Footer Section -->
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
import ErrorMessage from "@/components/ErrorMessage.vue";

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
        ErrorMessage,
    },
    setup() {
        const store = useStore();

        const sales = computed(() => store.getters.GET_SALES);
        const topXSales = computed(() => store.getters.GET_TOP_X_SALES);
        const topXBuyers = computed(() => store.getters.GET_TOP_X_BUYERS);
        const groupedSales = computed(() => store.getters.GET_GROUPED_SALES);
        const getError = computed(() => store.getters.GET_ERROR);

        onMounted(() => {
            initTWE({ Tooltip });

            store.dispatch("getTopXSoldNFTs");
            store.dispatch("computeGroupSales");
            store.dispatch("getTopXBuyers");
        });

        return { sales, topXSales, groupedSales, topXBuyers, getError };
    },
};
</script>
