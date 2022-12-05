const initialState = () => ({
    produits: {},
    produit: null,
    allProduits: [],
    topProduits: [],
    authProduits: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_PRODUITS(state, allProduits) {
        state.allProduits = allProduits;
    },
    SET_TOP_PRODUITS(state, topProduits) {
        state.topProduits = topProduits;
    },
    SET_AUTH_PRODUITS(state, authProduits) {
        state.authProduits = authProduits;
    },
    SET_PRODUITS(state, produits) {
        state.produits = produits;
    },

    SET_SEARCHED_PRODUITS(state, produits) {
        state.produits = produits;
    },

    SET_PRODUIT(state, produit) {
        state.produit = produit;
    },

    SET_CURRENT_PAGE(state, page) {
        state.produits.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllProduits({ commit }) {
        return this.$api.getAllProduits().then((data) => {
            commit("SET_ALL_PRODUITS", data);
        });
    },

    fetchTopProduits({ commit }) {
        return this.$api.getTopProduits().then((data) => {
            // console.log(data)
            commit("SET_TOP_PRODUITS", data);
        });
    },
    fetchAuthProduits({ commit }) {
        return this.$api.getAuthProduits().then((data) => {
            commit("SET_AUTH_PRODUITS", data);
        });
    },

    fetchProduits({ commit }, page) {
        return this.$api.selectAllProduitPage(page).then((data) => {
            commit("SET_PRODUITS", data);
        });
    },

    searchProduits({ commit }, { page, search }) {
        return this.$api.searchAllProduitPage(page, search).then((data) => {
            commit("SET_SEARCHED_PRODUITS", data);
        });
    },

};
