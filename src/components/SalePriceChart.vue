<template>
    <div
        class="w-full flex justify-center flex-col space-y-5 items-center pt-3 pb-6"
    >
        <div class="font-extrabold text-xl text-center">Sales History</div>
        <canvas
            ref="salesPriceChart"
            class="w-full md:w-[70%] lg:w-[70%]"
        ></canvas>
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { Chart } from "chart.js/auto";
import { useStore } from "vuex";

export default {
    name: "SalePriceChart",
    props: {
        groupedSales: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const salesPriceChart = ref(null);
        const store = useStore();
        let chartInstance = null;

        const renderChart = () => {
            if (chartInstance) {
                chartInstance.destroy(); // Destroy the previous chart instance if it exists
            }
            chartInstance = new Chart(salesPriceChart.value, {
                type: "bar",
                data: {
                    labels: props.groupedSales.map((x) => x.date),
                    datasets: [
                        {
                            label: "Amount in Base ETH",
                            data: props.groupedSales.map(
                                (x) => x.totalSalesPrice
                            ),
                            borderWidth: 1,
                            backgroundColor: "#b1b1b1",
                            borderRadius: "1rem",
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    responsive: true,
                    color: "white",
                },
            });
        };

        onMounted(() => {
            store.commit("SET_LOADING");
            store.dispatch("computeGroupSales").then(() => {
                renderChart(); // Render the chart after the data is computed
                store.commit("SET_NOT_LOADING");
            });
        });

        // Watch for changes in groupedSales and re-render the chart when data changes
        watch(
            () => props.groupedSales,
            (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    renderChart();
                }
            },
            { immediate: true }
        );

        return {
            salesPriceChart,
        };
    },
};
</script>
