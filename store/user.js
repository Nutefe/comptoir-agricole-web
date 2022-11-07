const initialState = () => ({
    users: {},
    user: null,
    allUsers: [],
    etat: false,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_USERS(state, allUsers) {
        state.allUsers = allUsers;
    },

    SET_USERS(state, users) {
        state.users = users;
    },

    SET_SEARCHED_USERS(state, users) {
        state.users = users;
    },

    SET_USER(state, user) {
        state.user = user;
    },

    SET_CURRENT_PAGE(state, page) {
        state.users.current_page = page;
    },

};

export const actions = {
    
    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllUsers({ commit }) {
        return this.$api.selectAllUsers().then((data) => {
            commit("SET_ALL_USERS", data);
        });
    },

    fetchUsers({ commit }, page) {
        return this.$api.selectAllUserPage(page).then((data) => {
            commit("SET_USERS", data);
        });
    },

    searchUsers({ commit }, { page, search }) {
        return this.$api.searchAllUserPage(page, search).then((data) => {
            commit("SET_SEARCHED_USERS", data);
        });
    },

    saveUser({ commit }, user) {
        return this.$api.saveUser(user).then((data) => {
            commit("SET_USER", data);
        });
    },

    updateUser({ commit }, user, id) {
        return this.$api.updateUser(user, id).then((data) => {
            commit("SET_USER", data);
        });
    },

    updateUserConnect({ commit }, user) {
        return this.$api.updateUserConnect(user).then((data) => {
            commit("SET_USER", data);
        });
    },

    updatePasswordUserConnect({ commit }, password) {
        return this.$api.updatePasswordUserConnect(password).then((data) => {
            commit("SET_USER", data);
        });
    },

    updatePasswordUser({ commit }, {id, password}) {
        return this.$api.updatePasswordUser(password, id).then((data) => {
            commit("SET_USER", data);
        });
    },

    checkUsername({ commit }, s) {
        return this.$api.checkUsername(s).then((data) => {
            commit("SET_ETAT", data);
        });
    },

    checkUsernameUserConnect({ commit }, s, id) {
        return this.$api.checkUserUsernameUpdate(s, id).then((data) => {
            commit("SET_ETAT", data);
        });
    },

    checkEmail({ commit }, s) {
        return this.$api.checkEmail(s).then((data) => {
            commit("SET_ETAT", data);
        });
    },

    checkEmailUserConnect({ commit }, s, id) {
        return this.$api.checkUserEmailUpdate(s, id).then((data) => {
            commit("SET_ETAT", data);
        });
    },

    checkTel({ commit }, s) {
        return this.$api.checkTel(s).then((data) => {
            commit("SET_ETAT", data);
        });
    },

    checkTelUserConnect({ commit }, s, id) {
        return this.$api.checkUserTelUpdate(s, id).then((data) => {
            commit("SET_ETAT", data);
        });
    },

    fetchUser({ commit, getters }, id) {
        const user = getters.getUserById(id);

        if (user) {
            return commit("SET_USER", user);
        } else {
            return this.$api.selectOneUser(id).then((data) => {
                commit("SET_USER", data);
            });
        }
    },
        
};

export const getters = {
    usersTotal: (state) => state.users?.total || 0,
    getUserById: (state) => (id) => {
        const users = state.users.data || [];

        return users
            .find((art) => art.id === id);
    },
};