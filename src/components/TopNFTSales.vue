<template>
    <div class="overflow-x-auto w-full sm:-mx-6 lg:-mx-8">
        <div class="font-extrabold text-xl text-center">Top NFT Sales</div>
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full text-center text-sm font-light">
                    <thead
                        class="border-b border-border-neutral-600 font-medium"
                    >
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-4 cursor-pointer"
                                @click="sortTable('tokenAddress')"
                            >
                                Token
                                <span v-if="sortBy === 'tokenAddress'">
                                    {{ sortDirection === "asc" ? "▲" : "▼" }}
                                </span>
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-4 cursor-pointer"
                                @click="sortTable('count')"
                            >
                                No
                                <span v-if="sortBy === 'count'">
                                    {{ sortDirection === "asc" ? "▲" : "▼" }}
                                </span>
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-4 cursor-pointer"
                                @click="sortTable('tokenId')"
                            >
                                Token ID
                                <span v-if="sortBy === 'tokenId'">
                                    {{ sortDirection === "asc" ? "▲" : "▼" }}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in sortedData"
                            :key="item.id"
                            class="border-b border-neutral-600"
                        >
                            <td
                                class="whitespace-nowrap px-6 py-4 hover:opacity-70 cursor-pointer"
                                @click="$viewOnBaseScan(item.tokenAddress)"
                            >
                                {{ $shortenAddress(item.tokenAddress) }}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                                {{ item.count }}
                            </td>
                            <td
                                class="whitespace-nowrap px-6 py-4 hover:opacity-70 cursor-pointer"
                            >
                                {{ item.tokenId }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
// import { useStore } from "vuex";

export default {
    name: "TopNFTSales",
    props: {
        topXSales: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        // const store = useStore();
        const sortBy = ref("count"); // default sort column
        const sortDirection = ref("desc"); // default sort direction

        onBeforeMount(() => {
            // store.dispatch("getTopXSoldNFTs");
        });

        const sortedData = computed(() => {
            return [...props.topXSales]
                .sort((a, b) => {
                    if (a[sortBy.value] < b[sortBy.value]) {
                        return sortDirection.value === "asc" ? -1 : 1;
                    }
                    if (a[sortBy.value] > b[sortBy.value]) {
                        return sortDirection.value === "asc" ? 1 : -1;
                    }
                    return 0;
                })
                .slice(0, 7);
        });

        function sortTable(column) {
            if (sortBy.value === column) {
                sortDirection.value =
                    sortDirection.value === "asc" ? "desc" : "asc";
            } else {
                sortBy.value = column;
                sortDirection.value = "asc";
            }
        }

        return {
            sortTable,
            sortBy,
            sortDirection,
            sortedData,
        };
    },
};
</script>
