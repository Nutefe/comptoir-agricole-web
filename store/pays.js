const initialState = () => ({
    payss: {},
    onePays: null,
    allPays: [],
    allAuthPays: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_PAYSS(state, allPays) {
        state.allPays = allPays;
    },


    SET_ALL_AUTH_PAYSS(state, allAuthPays) {
        state.allAuthPays = allAuthPays;
    },

    SET_PAYSS(state, payss) {
        state.payss = payss;
    },

    SET_SEARCHED_PAYSS(state, payss) {
        state.payss = payss;
    },

    SET_PAYS(state, pays) {
        state.pays = pays;
    },

    SET_CURRENT_PAGE(state, page) {
        state.payss.current_page = page;
    },

};

export const actions = {
    
    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllPayss({ commit }) {
        return this.$api.getAllPays().then((data) => {
            commit("SET_ALL_PAYSS", data);
        });
    },

    fetchAllAuthPayss({ commit }) {
        return this.$api.getAllAuthPays().then((data) => {
            commit("SET_ALL_AUTH_PAYSS", data);
        });
    },

    fetchPayss({ commit }, page) {
        return this.$api.selectAllPaysPage(page).then((data) => {
            commit("SET_PAYSS", data);
        });
    },

    searchPayss({ commit }, { page, search }) {
        return this.$api.searchAllPaysPage(page, search).then((data) => {
            commit("SET_SEARCHED_PAYSS", data);
        });
    },
        
};
