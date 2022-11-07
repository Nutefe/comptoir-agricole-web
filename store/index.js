const initialState = () => ({
    drawer: false,
    drawerDefault: false,
    drawerDefaultNav: false,
    step: 1,
    loginDialog: false,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_DRAWER(state, drawer) {
        state.drawer = drawer;
    },

    SET_STEP(state, step) {
        state.step = step;
    },

    SET_LOGIN_DIALOG(state, loginDialog) {
        state.loginDialog = loginDialog;
    },

    SET_DRAWER_DEFAULT(state, drawerDefault) {
        state.drawerDefault = drawerDefault;
    },

    SET_DRAWER_DEFAULT_NAV(state, drawerDefaultNav) {
        state.drawerDefaultNav = drawerDefaultNav;
    },
};

export const actions = {

    resetState({ commit, dispatch }) {
        commit("RESET_STATE");
    },

    toggleDrawer({ commit }, drawer) {
        commit("SET_DRAWER", drawer);
    },

    setStep({ commit }, step) {
        commit("SET_STEP", step);
    },

    toggleLoginDialog({ commit }, loginDialog) {
        commit("SET_LOGIN_DIALOG", loginDialog);
    },

    toggleDrawerDefault({ commit }, drawerDefault) {
        commit("SET_DRAWER_DEFAULT", drawerDefault);
    },

    toggleDrawerDefaultNav({ commit }, drawerDefaultNav) {
        commit("SET_DRAWER_DEFAULT_NAV", drawerDefaultNav);
    },
};

export const getters = {
    drawer: (state) => state.drawer,
    drawerDefault: (state) => state.drawerDefault,
    drawerDefaultNav: (state) => state.drawerDefaultNav,
    step: (state) => state.step,
    loginDialog: (state) => state.loginDialog,
};
