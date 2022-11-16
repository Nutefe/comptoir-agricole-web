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

};
