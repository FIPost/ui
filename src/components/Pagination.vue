<template>
  <div>
    <button :disabled="isPreviousButtonDisabled" @click="previousPage">
      previous
    </button>

    <button :disabled="isNextButtonDisabled" @click="nextPage">
      next
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

const Pagination = defineComponent ({
  props: {
    currentPage: {type: Number, required: true},
    pageCount: {type: Number, required: true},
  },
  computed: {
    isPreviousButtonDisabled(): boolean {
      return this.currentPage === 1;
    },
    isNextButtonDisabled(): boolean {
      return this.currentPage === this.pageCount;
    }
  },
  methods: {
    nextPage(){
      this.$emit('nextPage');
    },
    previousPage(){
      this.$emit('previousPage');
    }
  },
})

export default Pagination;
</script>

<style scoped>

</style>