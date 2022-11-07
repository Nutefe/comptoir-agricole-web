const initialState = () => ({
    magasins: {},
    magasin: null,
    allMagasins: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_MAGASINS(state, allMagasins) {
        state.allMagasins = allMagasins;
    },

    SET_MAGASINS(state, magasins) {
        state.magasins = magasins;
    },

    SET_SEARCHED_MAGASINS(state, magasins) {
        state.magasins = magasins;
    },

    SET_MAGASIN(state, magasin) {
        state.magasin = magasin;
    },

    SET_CURRENT_PAGE(state, page) {
        state.magasins.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllMagasins({ commit }) {
        return this.$api.getAllMagasins().then((data) => {
            commit("SET_ALL_MAGASINS", data);
        });
    },

    fetchMagasins({ commit }, page) {
        return this.$api.selectAllMagasinPage(page).then((data) => {
            commit("SET_MAGASINS", data);
        });
    },

    searchMagasins({ commit }, { page, search }) {
        return this.$api.searchAllMagasinPage(page, search).then((data) => {
            commit("SET_SEARCHED_MAGASINS", data);
        });
    },

};
