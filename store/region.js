const initialState = () => ({
    regions: {},
    region: null,
    allRegions: [],
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },

    SET_ALL_REGIONS(state, allRegions) {
        state.allRegions = allRegions;
    },

    SET_REGIONS(state, regions) {
        state.regions = regions;
    },

    SET_SEARCHED_REGIONS(state, regions) {
        state.regions = regions;
    },

    SET_REGION(state, region) {
        state.region = region;
    },

    SET_CURRENT_PAGE(state, page) {
        state.regions.current_page = page;
    },

};

export const actions = {
    
    resetState({ commit }) {
        commit("RESET_STATE");
    },

    fetchAllRegions({ commit }) {
        return this.$api.getAllRegions().then((data) => {
            commit("SET_ALL_REGIONS", data);
        });
    },

    fetchRegions({ commit }, page) {
        return this.$api.selectAllRegionPage(page).then((data) => {
            commit("SET_REGIONS", data);
        });
    },

    searchRegions({ commit }, { page, search }) {
        return this.$api.searchAllRegionPage(page, search).then((data) => {
            commit("SET_SEARCHED_REGIONS", data);
        });
    },
        
};
