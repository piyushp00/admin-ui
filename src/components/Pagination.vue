<template>
  <div>
    <ul class="pagination" v-if="data.length > 5 || currentPage > 1">
      <li class="pagination-item">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          <i class="fa-solid fa-angle-left"></i>
        </button>
      </li>

      <!-- Visible Buttons Start -->

      <li class="pagination-item" v-for="(page, index) in pages" :key="index">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="onClickPage(page.number)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.number) }"
        >
          {{ page.number }}
        </button>
      </li>

      <!-- Visible Buttons End -->

      <li class="pagination-item">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="onClickNextPage"
          :disabled="isInLastPage"
        >
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="onClickLastPage"
          :disabled="isInLastPage"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: "Pagination",
  props: {
    data: {
      type: Array,
      required: true,
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return (
          this.totalPages -
          this.maxVisibleButtons +
          (this.maxVisibleButtons - 1)
        );
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      let range = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },

    onPageChange(page) {
      console.log(page);
      this.currentPage === page;
    },
  },
};
</script>
<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
  margin-left: 10px;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}



</style>
