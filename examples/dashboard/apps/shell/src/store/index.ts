import { createStore } from "vuex";

export interface MyStoreState {
  sharedData: string;
}

const store = createStore<MyStoreState>({
  state: {
    sharedData: "This is shared data",
  },
  mutations: {
    setSharedData(state, payload: string) {
      state.sharedData = payload;
    },
  },
});

export default store;
