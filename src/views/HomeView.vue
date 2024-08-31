<template>
    <div
        class="flex mx-auto py-6 flex-col justify-center items-center space-y-4 w-full"
    >
        <BaseSalesData :sales="sales"></BaseSalesData>
    </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Tooltip, initTWE } from "tw-elements";
import BaseSalesData from "@/components/BaseSalesData.vue";

export default {
    name: "HomeView",
    components: {
        BaseSalesData,
    },
    setup() {
        const store = useStore();

        const sales = computed(() => store.getters.GET_SALES);
        onMounted(() => {
            initTWE({ Tooltip });

            store.dispatch("getSales");
            store.dispatch("getTopXSoldNFTs");
        });

        return { sales };
    },
};
</script>
