const initialState = () => ({
    allTypes: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_TYPES(state, allTypes) {
        state.allTypes = allTypes;
    },

};

export const actions = {
    
    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllTypes({ commit }) {
        return this.$api.getAllTypeSpeculations().then((data) => {
            commit("SET_ALL_TYPES", data);
        });
    },
        
};