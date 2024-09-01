<template>
    <div class="overflow-x-auto w-full sm:-mx-6 lg:-mx-8">
        <div class="font-extrabold text-xl text-center">Top NFT Buyers</div>
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table
                    class="min-w-full text-center text-sm font-light flex flex-col"
                >
                    <thead
                        class="border-b border-border-neutral-600 font-medium"
                    >
                        <tr class="w-full flex justify-between items-center">
                            <th
                                scope="col"
                                class="px-6 py-4 cursor-pointer text-center mx-auto"
                                @click="sortTable('buyer')"
                            >
                                Buyer
                                <span v-if="sortBy === 'buyer'">
                                    {{ sortDirection === "asc" ? "▲" : "▼" }}
                                </span>
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-4 cursor-pointer text-center mx-auto"
                                @click="sortTable('nftsBought')"
                            >
                                NFTs Bought
                                <span v-if="sortBy === 'nftsBought'">
                                    {{ sortDirection === "asc" ? "▲" : "▼" }}
                                </span>
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-4 cursor-pointer text-center mx-auto"
                                @click="sortTable('amountSpent')"
                            >
                                Amount Spent (BaseETH)
                                <span v-if="sortBy === 'amountSpent'">
                                    {{ sortDirection === "asc" ? "▲" : "▼" }}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="h-[30rem] overflow-y-auto block w-full">
                        <tr
                            v-for="item in sortedData"
                            :key="item.id"
                            class="border-b border-neutral-600 flex w-full"
                        >
                            <td
                                class="whitespace-nowrap px-6 py-4 w-[33%] hover:opacity-70 cursor-pointer"
                                @click="$viewOnBaseScan(item.buyer)"
                            >
                                {{ $shortenAddress(item.buyer) }}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4 w-[33%]">
                                {{ item.nftsBought }}
                            </td>
                            <td
                                class="whitespace-nowrap px-6 py-4 w-[33%] hover:opacity-70 cursor-pointer"
                            >
                                {{ Number(item.amountSpent / 1e8).toFixed(5) }}
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

export default {
    name: "TopBuyers",
    props: {
        topXBuyers: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const sortBy = ref("count"); // default sort column
        const sortDirection = ref("desc"); // default sort direction

        onBeforeMount(() => {});

        const sortedData = computed(() => {
            return [...props.topXBuyers].sort((a, b) => {
                if (a[sortBy.value] < b[sortBy.value]) {
                    return sortDirection.value === "asc" ? -1 : 1;
                }
                if (a[sortBy.value] > b[sortBy.value]) {
                    return sortDirection.value === "asc" ? 1 : -1;
                }
                return 0;
            });
            // .slice(0, 7);
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
