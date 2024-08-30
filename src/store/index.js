import axios from "axios";
import { createStore } from "vuex";
import { salesQuery } from "../utils/sales-query";

export default createStore({
    state: {
        sales: [],
        error: { isError: false, error: null },
    },
    getters: {
        GET_SALES(state) {
            return state.sales;
        },
        GET_ERROR(state) {
            return state.error;
        },
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
    },
    modules: {},
});
