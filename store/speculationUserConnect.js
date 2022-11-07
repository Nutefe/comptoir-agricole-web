const initialState = () => ({
    speculations: {},
    speculation: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
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

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchSpeculations({ commit }, page) {
        return this.$api.selectAllSpeculationUserConnectPage(page).then((data) => {
            commit("SET_SPECULATIONS", data);
        });
    },

    searchSpeculations({ commit }, { page, search }) {
        return this.$api.searchAllSpeculationUserConnectPage(page, search).then((data) => {
            commit("SET_SEARCHED_SPECULATIONS", data);
        });
    },

};
