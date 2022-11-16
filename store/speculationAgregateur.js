const initialState = () => ({
    speculations: {},
    authSpeculations: {},
    speculation: null,
    allSpeculations: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_SPECULATIONS(state, allSpeculations) {
        state.allSpeculations = allSpeculations;
    },

    SET_SPECULATIONS(state, speculations) {
        state.speculations = speculations;
    },

    SET_SEARCHED_SPECULATIONS(state, speculations) {
        state.speculations = speculations;
    },

    SET_CURRENT_PAGE(state, page) {
        state.speculations.current_page = page;
    },

    SET_AUTH_SPECULATIONS(state, authSpeculations) {
        state.authSpeculations = authSpeculations;
    },

    SET_SEARCHED_AUTH_SPECULATIONS(state, authSpeculations) {
        state.authSpeculations = authSpeculations;
    },

    SET_CURRENT_AUTH_PAGE(state, page) {
        state.authSpeculations.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllSpeculations({ commit }) {
        return this.$api.getAllAuthSpeculations().then((data) => {
            commit("SET_ALL_SPECULATIONS", data);
        });
    },

    fetchSpeculations({ commit }, page) {
        return this.$api.selectAllSpeculationAgrPage(page).then((data) => {
            commit("SET_SPECULATIONS", data);
        });
    },

    searchSpeculations({ commit }, { page, search }) {
        return this.$api.searchAllSpeculationAgrPage(page, search).then((data) => {
            commit("SET_SEARCHED_SPECULATIONS", data);
        });
    },

    fetchAuthSpeculations({ commit }, page) {
        return this.$api.selectAllAuthSpeculationValidePage(page).then((data) => {
            commit("SET_AUTH_SPECULATIONS", data);
        });
    },

    searchAuthSpeculations({ commit }, { page, search }) {
        return this.$api.searchAllAuthSpeculationValidePage(page, search).then((data) => {
            commit("SET_SEARCHED_AUTH_SPECULATIONS", data);
        });
    },

    fetchAuthSpeculationsCat({ commit }, { id, page }) {
        return this.$api.selectAllAuthSpeculationCatValidePage(id, page).then((data) => {
            commit("SET_AUTH_SPECULATIONS", data);
        });
    },

    searchAuthSpeculationsCat({ commit }, { id, page, search }) {
        return this.$api.searchAllAuthSpeculationCatValidePage(id, page, search).then((data) => {
            commit("SET_SEARCHED_AUTH_SPECULATIONS", data);
        });
    },

};
