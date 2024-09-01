<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light">
                        <thead
                            class="border-b border-border-neutral-600 font-medium"
                        >
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-4 cursor-pointer"
                                    @click="sortTable('timestamp')"
                                >
                                    Timestamp
                                    <span v-if="sortBy === 'timestamp'">
                                        {{
                                            sortDirection === "asc" ? "▲" : "▼"
                                        }}
                                    </span>
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-4 cursor-pointer"
                                    @click="sortTable('isERC721')"
                                >
                                    Token Standard
                                    <span v-if="sortBy === 'isERC721'">
                                        {{
                                            sortDirection === "asc" ? "▲" : "▼"
                                        }}
                                    </span>
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-4 cursor-pointer"
                                    @click="sortTable('buyer')"
                                >
                                    Buyer
                                    <span v-if="sortBy === 'buyer'">
                                        {{
                                            sortDirection === "asc" ? "▲" : "▼"
                                        }}
                                    </span>
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-4 cursor-pointer"
                                    @click="sortTable('seller')"
                                >
                                    Seller
                                    <span v-if="sortBy === 'seller'">
                                        {{
                                            sortDirection === "asc" ? "▲" : "▼"
                                        }}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in paginatedData"
                                :key="item.id"
                                class="border-b border-neutral-600"
                            >
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{
                                        timeAgo(new Date(item.timestamp / 1000))
                                    }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{
                                        item.isERC721 == true
                                            ? "ERC721"
                                            : "ERC1155"
                                    }}
                                </td>
                                <td
                                    class="whitespace-nowrap px-6 py-4 hover:opacity-70 cursor-pointer"
                                    @click="viewOnBaseScan(item.buyer)"
                                >
                                    {{ shortenAddress(item.buyer) }}
                                </td>
                                <td
                                    class="whitespace-nowrap px-6 py-4 hover:opacity-70 cursor-pointer"
                                    @click="viewOnBaseScan(item.seller)"
                                >
                                    {{ shortenAddress(item.seller) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="flex justify-between mt-4">
                        <button
                            @click="previousPage"
                            :disabled="currentPage === 1"
                            class="px-4 py-2 bg-zinc-600 text-white rounded"
                            :class="
                                currentPage === 1
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer hover:bg-opacity-75'
                            "
                        >
                            Previous
                        </button>
                        <span>Page {{ currentPage }} of {{ totalPages }}</span>
                        <button
                            @click="nextPage"
                            :disabled="currentPage === totalPages"
                            class="px-4 py-2 bg-zinc-600 text-white rounded"
                            :class="
                                currentPage === totalPages
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer hover:bg-opacity-75'
                            "
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
    name: "BaseSalesData",
    props: {
        sales: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        // Reactive properties
        const sortBy = ref("timestamp"); // default sort column
        const sortDirection = ref("desc"); // default sort direction
        const store = useStore();

        const currentPage = ref(1);
        const itemsPerPage = ref(10);

        onBeforeMount(() => {
            store.dispatch("getSales");
        });

        // Computed property for sorting data
        const sortedData = computed(() => {
            return [...props.sales].sort((a, b) => {
                if (a[sortBy.value] < b[sortBy.value]) {
                    return sortDirection.value === "asc" ? -1 : 1;
                }
                if (a[sortBy.value] > b[sortBy.value]) {
                    return sortDirection.value === "asc" ? 1 : -1;
                }
                return 0;
            });
        });

        const paginatedData = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return sortedData.value.slice(start, end);
        });

        const totalPages = computed(() => {
            return Math.ceil(sortedData.value.length / itemsPerPage.value);
        });

        // Method to seller sorting
        function sortTable(column) {
            if (sortBy.value === column) {
                sortDirection.value =
                    sortDirection.value === "asc" ? "desc" : "asc";
            } else {
                sortBy.value = column;
                sortDirection.value = "asc";
            }
        }

        function timeAgo(date) {
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);

            // Define time intervals
            const secondsInMinute = 60;
            const secondsInHour = secondsInMinute * 60;
            const secondsInDay = secondsInHour * 24;
            const secondsInMonth = secondsInDay * 30; // Approximation
            const secondsInYear = secondsInDay * 365; // Approximation

            let formattedTime = "";

            if (diffInSeconds < secondsInMinute) {
                formattedTime = `${Math.floor(diffInSeconds)}s`;
            } else if (diffInSeconds < secondsInHour) {
                const minutes = Math.floor(diffInSeconds / secondsInMinute);
                formattedTime = `${minutes}m`;
            } else if (diffInSeconds < secondsInDay) {
                const hours = Math.floor(diffInSeconds / secondsInHour);
                const minutes = Math.floor(
                    (diffInSeconds % secondsInHour) / secondsInMinute
                );
                formattedTime =
                    minutes > 0 ? `${hours}h${minutes}m` : `${hours}h`;
            } else if (diffInSeconds < secondsInMonth) {
                const days = Math.floor(diffInSeconds / secondsInDay);
                const hours = Math.floor(
                    (diffInSeconds % secondsInDay) / secondsInHour
                );
                formattedTime = hours > 0 ? `${days}d ${hours}h` : `${days}d`;
            } else if (diffInSeconds < secondsInYear) {
                const months = Math.floor(diffInSeconds / secondsInMonth);
                formattedTime = `${months}mo`;
            } else {
                const years = Math.floor(diffInSeconds / secondsInYear);
                formattedTime = `${years}y`;
            }

            return formattedTime;
        }

        const previousPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        function shortenAddress(address) {
            return `${address.slice(0, 5)}...${address.slice(-4)}`;
        }

        function viewOnBaseScan(address) {
            window.open(
                `${process.env.VUE_APP_BASESCAN_URL}/${address}`,
                "_blank"
            );
        }

        return {
            sortTable,
            sortedData,
            sortDirection,
            sortBy,
            timeAgo,
            currentPage,
            nextPage,
            previousPage,
            totalPages,
            paginatedData,
            shortenAddress,
            viewOnBaseScan,
        };
    },
};
</script>
