<template>
  <div class="component-container no-padding">
    <div class="search-main">
      <div class="search-fields">
        <h2 class="text">Zoeken</h2>
      </div>

      <div class="search-fields">
        <SearchBar @valueChanged="valueChanged" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "./SearchBar.vue";

const SearchContainer = defineComponent({
  components: {
    SearchBar,
  },
  methods: {
    valueChanged(val) {
      //needs implementation
    },
    goToAddLocationPage() {
      this.$router.push("/locaties/nieuw");
    },
  },
  data() {
    return {
      result: "",
      options: ["Stad", "Gebouw", "Ruimte"],
    };
  },
});

export default SearchContainer;
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.search-main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 0.2rem;
  justify-content: flex-start;
  padding: 0.2rem;
}

.search-main div {
  margin: 0 0.2rem;
}

.search-fields {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 10px;
  justify-content: flex-start;
  align-items: center;
  padding: 0.75rem;

  .text {
    text-align: center;
    margin: 0;
    padding: 0;
  }
}

.search-title {
  text-align: center;
  font-family: $font-family;
  font-weight: 550;
  margin: auto 0 !important;
}

.qr {
  background-image: url("../assets/QRIcoon.png");
  background-size: contain;
  width: 30px;
  height: 30px;
  margin: auto 15px;
  cursor: pointer;
}

.plus-location {
  font-size: 30px;
  align-self: center;
  margin: 0 20px;
  cursor: pointer;
  color: $green-color;
}
</style>
