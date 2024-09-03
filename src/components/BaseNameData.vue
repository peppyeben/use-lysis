<template>
    <div class="flex flex-col w-full">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                    @click="sortTable('name')"
                                >
                                    Name
                                    <span v-if="sortBy === 'name'">
                                        {{
                                            sortDirection === "asc" ? "▲" : "▼"
                                        }}
                                    </span>
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-4 cursor-pointer"
                                    @click="sortTable('expires')"
                                >
                                    Expires
                                    <span v-if="sortBy === 'expires'">
                                        {{
                                            sortDirection === "asc" ? "▲" : "▼"
                                        }}
                                    </span>
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-4 cursor-pointer"
                                    @click="sortTable('owner')"
                                >
                                    Registered By
                                    <span v-if="sortBy === 'owner'">
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
                                        $timeAgo(
                                            new Date(item.timestamp / 1000)
                                        )
                                    }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{
                                        String(item.name).length > 12
                                            ? String(item.name).slice(0, 9) +
                                              "..."
                                            : String(item.name)
                                    }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ $timeUntil(item.expires * 1e3) }}
                                </td>
                                <td
                                    class="whitespace-nowrap px-6 py-4 hover:opacity-70 cursor-pointer"
                                    @click="viewOnBaseScan(item.owner)"
                                >
                                    {{ shortenAddress(item.owner) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center mt-4">
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
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
// import { useStore } from "vuex";

export default {
    name: "BaseNameData",
    props: {
        names: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        // Reactive properties
        const sortBy = ref("timestamp"); // default sort column
        const sortDirection = ref("desc"); // default sort direction
        // const store = useStore();

        const currentPage = ref(1);
        const itemsPerPage = ref(10);

        onBeforeMount(() => {
            // store.dispatch("getSales");
        });

        // Computed property for sorting data
        const sortedData = computed(() => {
            return [...props.names].sort((a, b) => {
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
