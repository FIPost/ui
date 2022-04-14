<template>
  <div>
    <btn-back />
    <div style="padding: .5em; display: inline-block;margin-bottom: 10px">
      <a style="font-weight: bolder; font-size: 26px;">Locatie Overzicht</a>
      <a style="position:absolute; right: 2.5%;z-index: 5;"><font-awesome-icon @click="goToAddLocationPage()" class="plus-location" icon="plus-square"/></a>
    </div>

<!--    <SearchContainerLocation />-->
    <location-overview-table />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BtnBack from "@/components/standardUi/BtnBack.vue";
import LocationOverviewTable from "@/components/location/LocationOverviewTable.vue";
import SearchContainerLocation from "@/components/SearchContainerLocation.vue";

@Options({
  components: {
    BtnBack,
    LocationOverviewTable,
    SearchContainerLocation
  },
  methods: {
    valueChanged(val) {
      // Needs implementation.
      console.log(val);
    },
    goToAddLocationPage() {
      this.$router.push("/locaties/nieuw");
    },
  }
})
export default class LocatieOverzicht extends Vue {}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.plus-location {
  font-size: 30px;
  margin: 0 20px;
  cursor: pointer;
  color: $green-color;
}
</style>