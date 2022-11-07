const initialState = () => ({
    modes: {},
    mode: null,
    allModes: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_MODES(state, allModes) {
        state.allModes = allModes;
    },

    SET_MODES(state, modes) {
        state.modes = modes;
    },

    SET_SEARCHED_MODES(state, modes) {
        state.modes = modes;
    },

    SET_MODE(state, mode) {
        state.mode = mode;
    },

    SET_CURRENT_PAGE(state, page) {
        state.modes.current_page = page;
    },

};

export const actions = {
    
    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllModes({ commit }) {
        return this.$api.getAllModePaiements().then((data) => {
            commit("SET_ALL_MODES", data);
        });
    },

    fetchModes({ commit }, page) {
        return this.$api.selectAllModePaiementPage(page).then((data) => {
            commit("SET_MODES", data);
        });
    },

    searchModes({ commit }, { page, search }) {
        return this.$api.searchAllModePaiementPage(page, search).then((data) => {
            commit("SET_SEARCHED_MODES", data);
        });
    },
        
};
