<template>
  <div class="container bg-grey">
    <div class="row">
      <h1 class="text-center mt-3">ADMIN</h1>
    </div>
    
    <UsersNew />
  </div>
</template>

<script>
import UsersNew from "./components/Users";
export default {
  name: "App",
  components: {
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
