<template>
  <div class="row mt-3">
    <div>
      <input
        type="search"
        class="form-control"
        placeholder="Search by name, email or role"
        v-model="filter"
        id="searchBar"
        @input="searchTable"
      />
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-md-12 table-responsive">
      <table class="table table-hover table-borderless mx-auto border rounded">
        <thead class="bg-secondary bg-gradient">
          <tr>
            <th scope="col">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="allSelected"
                @click="selectAll"
              />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in this.paginatedData" :key="index">
            <td>
              <input
                class="form-check-input"
                type="checkbox"
                :value="user.id"
                :checked="user.selected"
                v-model="selectedUser"
                @click="onClickCheckbox(user)"
              />
            </td>
            <td>
              <div v-if="editingId == user.id">
                <input type="text" v-model="user.name" />
              </div>
              <div v-else>{{ user.name }}</div>
            </td>

            <td>
              <div v-if="editingId == user.id">
                <input type="text" v-model="user.email" />
              </div>
              <div v-else>{{ user.email }}</div>
            </td>
            <td>
              <div v-if="editingId == user.id">
                <input type="text" v-model="user.role" />
              </div>
              <div v-else>{{ user.role }}</div>
            </td>
            <td class="d-flex">
              <div class="" v-if="editingId == user.id">
                <input
                  type="button"
                  class="btn btn-sm btn-secondary"
                  value="Save"
                  @click="onSave(user)"
                />
              </div>
              <div v-else class="ms-2" @click="setToEditing(user)">
                <i class="fas fa-edit"></i>
              </div>
              <div class="mx-4" @click="deleteUser(user.id)">
                <i class="fas fa-trash-alt"></i>
              </div>
            </td>
          </tr>
        </tbody>
        <caption>
          <span>
            Page {{ currentPage }} of {{ Math.ceil(allUsers.length / perPage) }}
          </span>
        </caption>
      </table>
    </div>
  </div>
  <div class="d-flex justify-content-between mt-2 mb-2">
    <div>
      <button type="button" class="btn btn-danger" @click="deleteSelectedUsers">
        Delete Selected
      </button>
    </div>

    <div class="me-4">
      <pagination
        :data="this.paginatedData"
        :totalPages="Math.ceil(allUsers.length / perPage)"
        :total="allUsers.length"
        :perPage="perPage"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from "./Pagination.vue";

export default {
  name: "Users",
  components: {
    Pagination,
  },
  mounted() {
    this.fetchUsers();
  },

  data() {
    return {
      filter: "",
      currentPage: 1,
      perPage: 10,
      searchString: "",
      checked: false,
      allSelected: false,
      selectedUser: [],
      editingId: null,
      arr: [],
    };
  },
  methods: {
    ...mapActions([
      "fetchUsers",
      "deleteUser",
      "deleteSelectedUsers",
      "updateUser",
      "searchUsers",
    ]),

    setToEditing(user) {
      this.editingId = user.id;
    },
    onSave(user) {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      this.updateUser(userData);
      this.editingId = null;
    },
    onPageChange(page) {
      console.log("page changed", page);
      this.currentPage = page;
      // this.allSelected = !this.allSelected;
    },
    onClickCheckbox(user) {
      user.selected = !user.selected;
      if (user.selected) {
        console.log("selected == true", user);
      } else {
        console.log("unselected == false", user);
      }
    },
    deleteSelectedUsers() {
      this.paginatedData.forEach((user) => {
        if (this.selectedUser.includes(user.id)) {
          this.deleteUser(user.id);
        }
        this.allSelected = false;
      });
    },
    selectAll() {
      this.selectedUser = [];

      if (!this.allSelected) {
        this.paginatedData.forEach((user) => {
          this.selectedUser.push(user.id);
        });
      }
    },
    searchTable() {
      let searchBar = document.getElementById("searchBar");
      searchBar.addEventListener("keyup", this.filteredData);
    },
  },
  computed: {
    ...mapGetters(["allUsers"]),
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      if (this.filter !== "") {
        console.log("start-" + start + " end-" + end);
        return this.filteredData.slice(start, end);
      } else {
        console.log("start-" + start + " end-" + end);
        return this.allUsers.slice(start, end);
      }
    },
    filteredData() {
      if (this.filter !== "") {
        this.searchUsers(this.filter);
      }

      if (this.filter === "") {
        this.fetchUsers();
      }

      return this.allUsers;
    },
  },
};
</script>

<style scoped>
.fa-trash-alt {
  color: red;
}

.fas {
  cursor: pointer;
}
</style>
