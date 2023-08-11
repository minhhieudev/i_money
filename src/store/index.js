import { createStore } from "vuex";

const store = createStore({
  state: {
    currentBalance: 0,
  },
  mutations: {
    updateCurrentBalance(state, value) {
      state.currentBalance = value;
    },
  },
});

export default store;
