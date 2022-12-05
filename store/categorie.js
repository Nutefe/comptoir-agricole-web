const initialState = () => ({
    categories: {},
    categorie: null,
    allCategories: [],
    topCategories: [],
    authCategories: [],
    etat: false,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_CATEGORIES(state, allCategories) {
        state.allCategories = allCategories;
    },

    SET_TOP_CATEGORIES(state, topCategories) {
        state.topCategories = topCategories;
    },


    SET_AUTH_CATEGORIES(state, authCategories) {
        state.authCategories = authCategories;
    },

    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },

    SET_SEARCHED_CATEGORIES(state, categories) {
        state.categories = categories;
    },

    SET_CATEGORIE(state, categorie) {
        state.categorie = categorie;
    },

    SET_CURRENT_PAGE(state, page) {
        state.categories.current_page = page;
    },

};

export const actions = {
    
    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllCategories({ commit }) {
        return this.$api.getAllCategories().then((data) => {
            commit("SET_ALL_CATEGORIES", data);
        });
    },

    fetchTopCategories({ commit }) {
        return this.$api.getTopCategories().then((data) => {
            commit("SET_TOP_CATEGORIES", data);
        });
    },
    fetchAuthCategories({ commit }) {
        return this.$api.getAuthCategories().then((data) => {
            commit("SET_AUTH_CATEGORIES", data);
        });
    },
    fetchCategories({ commit }, page) {
        return this.$api.selectAllCategoriePage(page).then((data) => {
            commit("SET_CATEGORIES", data);
        });
    },

    searchCategories({ commit }, { page, search }) {
        return this.$api.searchAllCategoriePage(page, search).then((data) => {
            commit("SET_SEARCHED_CATEGORIES", data);
        });
    },

    fetchCategorie({ commit, getters }, id) {
        const categorie = getters.getCategorieById(id);

        if (categorie) {
            return commit("SET_CATEGORIE", categorie);
        } else {
            return this.$api.getCategorie(id).then((data) => {
                commit("SET_CATEGORIE", data);
            });
        }
    },
        
};

export const getters = {
    categoriesTotal: (state) => state.categories?.total || 0,
    getCategorieById: (state) => (id) => {
        const categories = state.categories.data || [];

        return categories
            .find((art) => art.id === id);
    },
};