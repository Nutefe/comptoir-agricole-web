const initialState = () => ({
    villes: {},
    ville: null,
    allVilles: [],
    allVillesPays: [],
    allAuthVilles: [],
    allAuthVillesPays: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_VILLES(state, allVilles) {
        state.allVilles = allVilles;
    },

    SET_ALL_VILLES_PAYS(state, allVilles) {
        state.allVilles = allVilles;
    },

    SET_ALL_AUTH_VILLES(state, allAuthVilles) {
        state.allAuthVilles = allAuthVilles;
    },

    SET_ALL_AUTH_VILLES_PAYS(state, allAuthVillesPays) {
        state.allAuthVillesPays = allAuthVillesPays;
    },

    SET_VILLES(state, villes) {
        state.villes = villes;
    },

    SET_SEARCHED_VILLES(state, villes) {
        state.villes = villes;
    },

    SET_VILLE(state, ville) {
        state.ville = ville;
    },

    SET_CURRENT_PAGE(state, page) {
        state.villes.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllVilles({ commit }) {
        return this.$api.getAllVilles().then((data) => {
            commit("SET_ALL_VILLES", data);
        });
    },

    fetchAllVillesPays({ commit }, id) {
        return this.$api.getAllVillePays(id).then((data) => {
            commit("SET_ALL_VILLES", data);
        });
    },


    fetchAllAuthVilles({ commit }) {
        return this.$api.getAllAuthVilles().then((data) => {
            commit("SET_ALL_AUTH_VILLES", data);
        });
    },

    fetchAllAuthVillesPays({ commit }, id) {
        return this.$api.getAllAuthVillePays(id).then((data) => {
            commit("SET_ALL_AUTH_VILLES", data);
        });
    },


    fetchVilles({ commit }, page) {
        return this.$api.selectAllVillePage(page).then((data) => {
            commit("SET_VILLES", data);
        });
    },

    searchVilles({ commit }, { page, search }) {
        return this.$api.searchAllVillePage(page, search).then((data) => {
            commit("SET_SEARCHED_VILLES", data);
        });
    },

};
