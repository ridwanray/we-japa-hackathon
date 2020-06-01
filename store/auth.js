
export const state = () => ({
  token: null,
  isAuthenticated: false
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  },
  setAuthenticationState(state, status) {
    state.isAuthenticated = status;
  }
};

export const actions = {
  async loginUser({ commit }, data) {
    let url = 'developer/login'
    try {
      const response = await this.$axios.$post(url, data);
      console.log(response.data.developer);

      const { email, name } = response.data.developer
      const { token } = response.data
      const userObj = {
        name: name,
        email: email
      }
      localStorage.setItem("developerToken", token);
      localStorage.setItem("authUser", JSON.stringify(userObj));
      commit("setAuthenticationState", true);
      commit("setToken", token);
      this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return response
    } catch (error) {
      if (error.response) {
        console.log(error);
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          "Unable to Login, please check your network and try again later"
        );
      }
    }
  },
};

export const getters = {
  getToken() {
    return state.token;
  }
};
