<template>
    <div
        class="flex mx-auto py-6 flex-col justify-center items-center space-y-4 w-full"
    >
        <BaseSalesData :sales="sales"></BaseSalesData>
        <div class="mt-16 flex justify-center">
            <ul v-if="sales.length">
                <li
                    v-for="sale in sales"
                    :key="sale.id"
                    class="flex flex-col justify-center items-center space-y-3"
                >
                    <!-- Display sale details -->
                    <span>ERC721: {{ sale.isERC721 }}</span>
                    <span>Seller: {{ sale.seller }}</span>
                    <!-- {{ sale }} -->
                </li>
            </ul>
            <p v-else>No sales data available.</p>
        </div>
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
        });

        return { sales };
    },
};
</script>
