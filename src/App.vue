<template>
  <div class="container border bg-grey">
    <div class="row">
      <h1 class="text-center">ADMIN</h1>
    </div>
    <SearchUsers />
    <UsersNew />
  </div>
</template>

<script>
import SearchUsers from "./components/SearchUsers";
import UsersNew from "./components/UsersNew";
export default {
  name: "App",
  components: {
    SearchUsers,
    UsersNew,
  },

  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style></style>
