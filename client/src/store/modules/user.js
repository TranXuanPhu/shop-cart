import AccountService from "../../api/services/account.service.js";

//state
const state = {
  status: { loggedIn: false },
  loggedUser: {},
};

//getters
const getters = {
  getLoggedUser: (state) => state.loggedUser,
};

//actions
const actions = {
  setLoggedUser: ({ commit }, user) => {
    commit("setUser", user);
  },
  register({ commit }, user) {
    return AccountService.register(user).then(
      (response) => {
        commit("registerSuccess");
        return Promise.resolve(response.data);
      },
      (error) => {
        commit("registerFailure");
        return Promise.reject(error);
      }
    );
  },
};

//mutations
const mutations = {
  setLoggedUser: (state, user) => {
    state.loggedUser = user;
  },

  registerSuccess(state) {
    state.status.loggedIn = false;
  },
  registerFailure(state) {
    state.status.loggedIn = false;
  },
};

export const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
