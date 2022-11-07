const initialState = () => ({
    commandes: {},
    commande: null,
    allCommandes: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_COMMANDES(state, allCommandes) {
        state.allCommandes = allCommandes;
    },

    SET_COMMANDES(state, commandes) {
        state.commandes = commandes;
    },

    SET_SEARCHED_COMMANDES(state, commandes) {
        state.commandes = commandes;
    },

    SET_COMMANDE(state, commande) {
        state.commande = commande;
    },

    SET_CURRENT_PAGE(state, page) {
        state.commandes.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllCommandes({ commit }) {
        return this.$api.getAllCommandes().then((data) => {
            commit("SET_ALL_COMMANDES", data);
        });
    },

    fetchCommandes({ commit }, page) {
        return this.$api.selectAllCommandePage(page).then((data) => {
            commit("SET_COMMANDES", data);
        });
    },

    searchCommandes({ commit }, { page, search }) {
        return this.$api.searchAllCommandePage(page, search).then((data) => {
            commit("SET_SEARCHED_COMMANDES", data);
        });
    },

};
