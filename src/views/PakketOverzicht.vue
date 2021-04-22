<template>
  <div id="overzicht">
    <btn-back />
    <h1>Pakketoverzicht</h1>
    <SearchContainer />
    <PakketTable
      :columns="columns"
      :columnKeys="columnKeys"
      v-bind:packages="packages"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import PakketTable from "@/components/PakketTable.vue";
import { pakketService } from "@/services/pakketService/pakketservice";
import Package from "@/classes/Package";
import SearchContainer from "@/components/SearchContainer.vue";
import BtnBack from "@/components/standardUi/BtnBack.vue";

@Options({
  components: {
    PakketTable,
    SearchContainer,
    BtnBack
  },
})
export default class PakketOverzicht extends Vue {
  private columns: string[] = ["ID", "Ontvanger", "Status", "Locatie", "Datum"];
  private columnKeys: string[] = [
    "id",
    "receiverId",
    "status",
    "collectionPointId",
    "sender",
  ];
  private packages: Array<Package> = [];

  async created() {
    let result = await pakketService.getAll();
    this.packages = result;
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";
</style>
