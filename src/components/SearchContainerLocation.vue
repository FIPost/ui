<template>
  <div class="component-container no-padding">
    <div class="search-main">
      <div class="search-title">Zoeken</div>
      <Search @valueChanged="valueChanged" />
   
      <ComboBox :options="options" placeholder="Selecteer een veld" />
         <font-awesome-icon @click="goToAddLocationPage()" class="plus-location"
        icon="plus-square"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Search from "./Search.vue";
import ComboBox from "@/components/standardUi/ComboBox.vue";

const SearchContainer = defineComponent({
  components: {
    Search,
    ComboBox,
  },
  methods: {
    valueChanged(val) {
      // Needs implementation.
      console.log(val);
    },
    goToAddLocationPage(){
      this.$router.push("/locaties/nieuw")
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styling/main.scss";

.no-padding {
  padding: 0 !important;
}

.search-main {
  display: flex;
  flex-direction: row !important;
  justify-content: flex-start !important;
  padding: 0.75rem;
}

.search-main div {
  margin: 0 0.75rem;
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
