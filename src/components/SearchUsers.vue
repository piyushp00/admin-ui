<template>
  <div class="row mt-3">
    <div>
      <input
        type="search"
        class="form-control"
        placeholder="Search by name, email or role"
        v-model="filter"
        @input="filteredRows"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchUsers",
  data() {
    return {
      filter: "",
    };
  },
  methods: {
    
  },

  watch: {},

  computed: {
    
  },
};
</script>

<style scoped></style>
