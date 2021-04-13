<template>
  <div class="component-container no-padding">
    <div class="search-main">
      <div class="search-title">Zoeken</div>
      <Search @valueChanged="valueChanged" />
      <QrReader />
      <ComboBox :options="options" placeholder="Selecteer een veld" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Search from "./Search.vue";
import QrReader from "./QrReader.vue";
import ComboBox from "@/components/standardUi/ComboBox.vue";

const SearchContainer = defineComponent({
  components: {
    Search,
    QrReader,
    ComboBox,
  },
  methods: {
    valueChanged(val) {
      // Needs implementation.
      console.log(val);
    },
  },
  data() {
    return {
      result: "",
      options: ["Naam", "Afzender", "Ontvanger"],
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

.stream {
  width: 400px;
  height: 400px;
}
</style>
