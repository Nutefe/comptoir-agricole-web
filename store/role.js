const initialState = () => ({
    allRoles: [],
    adminClientRoles: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_ROLES(state, allRoles) {
        state.allRoles = allRoles;
    },


    SET_ALL_ROLES_ADMIN_CLIENT(state, adminClientRoles) {
        state.adminClientRoles = adminClientRoles;
    },

};

export const actions = {
    
    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllRoles({ commit }) {
        return this.$api.selectAllRole().then((data) => {
            commit("SET_ALL_ROLES", data);
        });
    },

    fetchAllRolesAdminClient({ commit }) {
        return this.$api.selectAllRoleAdminClient().then((data) => {
            commit("SET_ALL_ROLES_ADMIN_CLIENT", data);
        });
    },
       
};
