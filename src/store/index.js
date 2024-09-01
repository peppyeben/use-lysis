import axios from "axios";
import { createStore } from "vuex";
import { salesQuery } from "../utils/sales-query";
import { groupSales } from "@/utils/group-sales";

export default createStore({
    state: {
        sales: [],
        topXSales: [],
        topXBuyers: [],
        groupedSales: [],
        isLoading: false,
        error: { isError: false, error: null },
    },
    getters: {
        GET_SALES: (state) => state.sales,
        GET_TOP_X_SALES: (state) => state.topXSales,
        GET_TOP_X_BUYERS: (state) => state.topXBuyers,
        GET_GROUPED_SALES: (state) => state.groupedSales,
        GET_ERROR: (state) => state.error,
        GET_LOADING: (state) => state.isLoading,
    },
    mutations: {
        SET_ERROR(state, payload) {
            state.error.isError = true;
            state.error.error = payload;
        },
        SET_REMOVE_ERROR(state) {
            state.error.isError = false;
            state.error.error = null;
        },

        SET_SALES(state, payload) {
            state.sales = payload;
        },

        SET_LOADING(state) {
            state.isLoading = true;
        },

        SET_NOT_LOADING(state) {
            state.isLoading = false;
        },

        SET_TOP_X_SALES(state, payload) {
            state.topXSales = payload;
        },

        SET_TOP_X_BUYERS(state, payload) {
            state.topXBuyers = payload;
        },

        SET_GROUPED_SALES(state, payload) {
            state.groupedSales = payload;
        },
    },
    actions: {
        async getSales({ commit }) {
            commit("SET_LOADING");
            try {
                const response = await axios.post(
                    process.env.VUE_APP_DATA_URL,
                    {
                        query: salesQuery,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                commit("SET_SALES", response.data.data.sales);
                commit("SET_NOT_LOADING");
            } catch (error) {
                commit("SET_ERROR", error);
            }
        },
        async getTopXSoldNFTs({ commit, getters, dispatch }) {
            commit("SET_LOADING");
            try {
                await dispatch("getSales");
                const sales = getters.GET_SALES;

                const tokenSalesCount = {};

                sales.forEach((sale) => {
                    const tokenKey = `${sale.tokenAddress}-${sale.tokenId}`;

                    if (tokenSalesCount[tokenKey]) {
                        tokenSalesCount[tokenKey]++;
                    } else {
                        tokenSalesCount[tokenKey] = 1;
                    }
                });

                // Filter and sort tokens with more than one sale
                const filteredTokens = Object.entries(tokenSalesCount)
                    // eslint-disable-next-line
                    .filter(([_, count]) => count > 1) // Filter out tokens with only one sale
                    .sort((a, b) => b[1] - a[1]); // Sort by sale count in descending order

                // Map the filtered and sorted tokens to the desired format
                const sortedResult = filteredTokens.map(([tokenKey, count]) => {
                    const [tokenAddress, tokenId] = tokenKey.split("-");
                    return { tokenAddress, tokenId, count };
                });

                commit("SET_TOP_X_SALES", sortedResult);
                commit("SET_NOT_LOADING", sortedResult);
            } catch (error) {
                commit("SET_ERROR", error);
            }
        },
        async computeGroupSales({ commit, getters, dispatch }) {
            commit("SET_LOADING");
            try {
                await dispatch("getSales");
                const sales = getters.GET_SALES;
                const groupedSales = groupSales(sales);
                commit("SET_GROUPED_SALES", groupedSales);
                commit("SET_NOT_LOADING");
            } catch (error) {
                commit("SET_ERROR", error);
            }
        },
        async getTopXBuyers({ commit, getters, dispatch }) {
            commit("SET_LOADING");
            try {
                await dispatch("getSales");
                const sales = getters.GET_SALES;

                const buyerStats = {};

                sales.forEach((sale) => {
                    const buyer = sale.buyer;
                    const salePrice = parseFloat(sale.salePrice) / 1e10;

                    if (buyerStats[buyer]) {
                        buyerStats[buyer].nftsBought++;
                        buyerStats[buyer].amountSpent += salePrice;
                    } else {
                        buyerStats[buyer] = {
                            nftsBought: 1,
                            amountSpent: salePrice,
                        };
                    }
                });

                // Sort buyers by the number of NFTs bought in descending order
                const sortedBuyers = Object.entries(buyerStats)
                    .sort((a, b) => b[1].nftsBought - a[1].nftsBought)
                    .map(([buyer, stats]) => ({
                        buyer,
                        nftsBought: stats.nftsBought,
                        amountSpent: stats.amountSpent,
                    }));

                commit("SET_TOP_X_BUYERS", sortedBuyers);
                commit("SET_NOT_LOADING");
            } catch (error) {
                commit("SET_ERROR", error);
            }
        },
    },
    modules: {},
});
