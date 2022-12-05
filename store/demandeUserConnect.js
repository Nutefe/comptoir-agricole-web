const initialState = () => ({
    demandes: {},
    allDemandes: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_DEMANDES(state, allDemandes) {
        state.allDemandes = allDemandes;
    },

    SET_DEMANDES(state, demandes) {
        state.demandes = demandes;
    },

    SET_SEARCHED_DEMANDES(state, demandes) {
        state.demandes = demandes;
    },

    SET_CURRENT_PAGE(state, page) {
        state.demandes.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllDemandes({ commit }) {
        return this.$api.getAllDemandes().then((data) => {
            commit("SET_ALL_DEMANDES", data);
        });
    },

    fetchDemandes({ commit }, page) {
        return this.$api.selectAllDemandeUserConnectPage(page).then((data) => {
            commit("SET_DEMANDES", data);
        });
    },

    searchDemandes({ commit }, { page, search }) {
        return this.$api.searchAllDemandeUserConnectPage(page, search).then((data) => {
            commit("SET_SEARCHED_DEMANDES", data);
        });
    },

    enableDemandes({ commit }, id) {
        return this.$api.enableDemande(id);
    },

};
