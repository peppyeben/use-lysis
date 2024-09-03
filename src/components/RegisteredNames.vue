<template>
    <div
        class="w-full flex justify-center flex-col space-y-5 items-center pt-3 pb-6 px-8"
    >
        <div class="font-extrabold text-xl text-center">Registered Names</div>
        <canvas
            ref="namesChart"
            class="w-fit h-fit max-w-[30rem] max-h-[30rem] md:w-[70%] lg:w-[70%]"
        ></canvas>
    </div>
</template>

<script>
import { watch, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Chart } from "chart.js/auto";

export default {
    name: "RegisteredNames",
    props: {
        groupedNames: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const store = useStore();

        const namesChart = ref(null);
        let chartInstance = null;

        const renderChart = () => {
            if (chartInstance) {
                chartInstance.destroy(); // Destroy the previous chart instance if it exists
            }
            chartInstance = new Chart(namesChart.value, {
                type: "line",
                data: {
                    labels: [...props.groupedNames.map((i) => i.date)],
                    datasets: [
                        {
                            label: "Names Registered",
                            data: [
                                ...props.groupedNames.map(
                                    (i) => i.namesRegistered
                                ),
                            ],
                            borderColor: "#FFF",
                            tension: 0.4, // Adjust the tension value to control the curve amount
                            hoverOffset: 4,
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Date",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Names Registered",
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });
        };

        onMounted(() => {
            store.commit("SET_LOADING");
            store.dispatch("computeGroupNames").then(() => {
                renderChart(); // Render the chart after the data is computed
                store.commit("SET_NOT_LOADING");
            });
        });

        watch(
            () => props.groupedNames,
            (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    renderChart();
                }
            },
            { immediate: true }
        );

        return { namesChart };
    },
};
</script>
