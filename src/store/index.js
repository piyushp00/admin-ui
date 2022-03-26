import { createStore } from 'vuex'
import users from "./modules/users";

//Create store
export const store = createStore({
  modules: {
    users
  }
});