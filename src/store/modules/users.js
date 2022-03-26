import axios from "axios";

const state = {
  users: [],
  filteredUsers: [],
};

const getters = {
  allUsers: (state) => state.users,
  filteredUsers: (state) => state.filteredUsers,
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    console.log(response.data);

    commit("fetchUsers", response.data);
  },
  searchUsers({ commit }, searchString) {
    commit("searchUsers", searchString);
  },
  deleteUser({ commit }, userId) {
    commit("deleteUser", userId);
  },
  updateUser({ commit }, userData) {
    commit("updateUser", userData);
  },
};

const mutations = {
  fetchUsers: (state, user) => (state.users = user),
  // searchUsers: (state, searchString) => {
  //   state.users = state.users.filter((user) => {
  //     return (
  //       // user.join(" ").includes(searchString)
  //       user.name.toLowerCase().includes(searchString.toLowerCase()) ||
  //       user.role.toLowerCase().includes(searchString.toLowerCase()) ||
  //       user.email.toLowerCase().includes(searchString.toLowerCase())
  //     );
  //   });
  // },
  searchUsers: (state, searchString) => {
    state.users = state.users.filter((user) => {
      const name = user.name.toLowerCase();
      const role = user.role.toLowerCase();
      const email = user.email.toLowerCase();
      const searchStringLower = searchString.toLowerCase();

      return (
        name.includes(searchStringLower) ||
        role.includes(searchStringLower) ||
        email.includes(searchStringLower)
      );
    });
  },
  deleteUser: (state, userId) => {
    state.users = state.users.filter((user) => user.id !== userId);
    console.log(userId + " deleted");
  },
  updateUser: (state, userData) => {
    const index = state.users.findIndex((user) => user.id === userData.id);
    if (index !== -1) {
      state.users.splice(index, 1, userData);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
