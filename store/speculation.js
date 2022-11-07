const initialState = () => ({
    speculations: {},
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

    SET_SPECULATION(state, speculation) {
        state.speculation = speculation;
    },

    SET_CURRENT_PAGE(state, page) {
        state.speculations.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllSpeculations({ commit }) {
        return this.$api.getAllSpeculations().then((data) => {
            commit("SET_ALL_SPECULATIONS", data);
        });
    },

    fetchSpeculations({ commit }, page) {
        return this.$api.selectAllSpeculationPage(page).then((data) => {
            commit("SET_SPECULATIONS", data);
        });
    },

    searchSpeculations({ commit }, { page, search }) {
        return this.$api.searchAllSpeculationPage(page, search).then((data) => {
            commit("SET_SEARCHED_SPECULATIONS", data);
        });
    },

};
