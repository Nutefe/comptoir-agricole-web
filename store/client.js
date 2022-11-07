const initialState = () => ({
    users: {},
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_USERS(state, users) {
        state.users = users;
    },

    SET_SEARCHED_USERS(state, users) {
        state.users = users;
    },


    SET_CURRENT_PAGE(state, page) {
        state.users.current_page = page;
    },

};

export const actions = {

    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchUsers({ commit }, page) {
        return this.$api.selectAllUserClientPage(page).then((data) => {
            commit("SET_USERS", data);
        });
    },

    searchUsers({ commit }, { page, search }) {
        return this.$api.searchAllUserClientPage(page, search).then((data) => {
            commit("SET_SEARCHED_USERS", data);
        });
    },


};
