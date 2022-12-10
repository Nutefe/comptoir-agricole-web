const initialState = () => ({
    sliders: {},
    allSliders: [],
    authSliders: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_SLIDERS(state, allSliders) {
        state.allSliders = allSliders;
    },
    SET_AUTH_SLIDERS(state, authSliders) {
        state.authSliders = authSliders;
    },
    SET_SLIDERS(state, sliders) {
        state.sliders = sliders;
    },

    SET_SEARCHED_SLIDERS(state, sliders) {
        state.sliders = sliders;
    },

    SET_CURRENT_PAGE(state, page) {
        state.sliders.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllSliders({ commit }) {
        return this.$api.getAllSliders().then((data) => {
            commit("SET_ALL_SLIDERS", data);
        });
    },
    fetchAuthSliders({ commit }) {
        return this.$api.selectAllSliderValidePage().then((data) => {
            commit("SET_AUTH_SLIDERS", data);
        });
    },

    fetchSliders({ commit }, page) {
        return this.$api.selectAllSliderPage(page).then((data) => {
            commit("SET_SLIDERS", data);
        });
    },

    searchSliders({ commit }, { page, search }) {
        return this.$api.searchAllSliderPage(page, search).then((data) => {
            commit("SET_SEARCHED_SLIDERS", data);
        });
    },

};
