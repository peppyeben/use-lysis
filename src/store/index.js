import axios from "axios";
import { createStore } from "vuex";
import { salesQuery } from "../utils/sales-query";

export default createStore({
    state: {
        sales: [],
        topXSales: [],
        error: { isError: false, error: null },
    },
    getters: {
        GET_SALES: (state) => state.sales,
        GET_TOP_X_SALES: (state) => state.topXSales,
        GET_ERROR: (state) => state.error,
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

        SET_TOP_X_SALES(state, payload) {
            state.topXSales = payload;
        },
    },
    actions: {
        async getSales({ commit }) {
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
            } catch (error) {
                commit("SET_ERROR", error);
            }
        },
        async getTopXSoldNFTs({ commit, getters, dispatch }) {
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
            } catch (error) {
                commit("SET_ERROR", error);
            }
        },
    },
    modules: {},
});
