<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table
                        class="min-w-full text-left text-sm font-light text-surface dark:text-white"
                    >
                        <thead
                            class="border-b border-neutral-200 font-medium dark:border-white/10"
                        >
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-4 cursor-pointer"
                                    @click="sortTable('id')"
                                >
                                    #
                                    <span v-if="sortBy === 'id'">
                                        {{
                                            sortDirection === "asc" ? "▲" : "▼"
                                        }}
                                    </span>
                                </th>
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
                                    @click="sortTable('tokenStandard')"
                                >
                                    Token Standard
                                    <span v-if="sortBy === 'tokenStandard'">
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
                                    seller
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
                                v-for="item in sortedData"
                                :key="item.id"
                                class="border-b border-neutral-200 dark:border-white/10"
                            >
                                <td
                                    class="whitespace-nowrap px-6 py-4 font-medium"
                                >
                                    {{ item.id }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ item.timestamp }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{
                                        item.isERC721 == true
                                            ? "ERC721"
                                            : "ERC1155"
                                    }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ item.seller }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

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
        const sortBy = ref("id"); // default sort column
        const sortDirection = ref("asc"); // default sort direction

        onMounted(() => {
            console.log(...props.sales);
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

        return {
            sortTable,
            sortedData,
            sortDirection,
            sortBy,
        };
    },
};
</script>
