<template>
  <div class="h-container">
    <div class="container-group">
      <div class="header">Start</div>
      <hr />
      <div class="m-container">
        <Menu @click="registerClicked()" class="item" labelText="Registreren">
          <RegisterSvg />
        </Menu>
        <Menu @click="searchClicked()" class="item" labelText="Zoeken">
          <SearchSvg />
        </Menu>
        <Menu @click="scanClicked()" class="item" labelText="Scannen">
          <ScanSvg />
        </Menu>
        <Menu @click="locationClicked()" class="item" labelText="Locaties">
          <LocationSvg />
        </Menu>
      </div>
    </div>
     <div class="container-group">
      <div class="header">Dashboard</div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "@/components/Menu.vue";
import LocationSvg from "@/components/svg/LocationSvg.vue";
import RegisterSvg from "@/components/svg/RegisterSvg.vue";
import ScanSvg from "@/components/svg/ScanSvg.vue";
import SearchSvg from "@/components/svg/SearchSvg.vue";

const Home = defineComponent({
  components: {
    Menu,
    LocationSvg,
    RegisterSvg,
    ScanSvg,
    SearchSvg
  },
  data() {
    return {};
  },
  methods: {
    registerClicked() : void {
      this.$router.push("/registratie");
    },
    searchClicked() : void {
      this.$router.push("/overzicht");
    },
    scanClicked() : void {
      this.$router.push("/pakket/1");
    },
    locationClicked() : void {
      this.$router.push("/locaties");
    },
  },
});
export default Home;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styling/main.scss";

.container-group {
  margin: 2em;
  margin-bottom: 4em;
}

.m-container {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.5em;
  row-gap: 1.5em;
}

.container-group {
  .header {
    font-family: $font-family;
    font-size: 2em;
    font-weight: 600;
    text-align: left;
  }

  hr {
    width: 75vw;
    border: 0;
    border-top: 3px solid $gray-color;
    opacity: 0.2;
    margin: 1em 0;
  }
}
</style>
