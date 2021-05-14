<template>
  <div id="overzicht">
    <btn-back />
    <h1>Pakketoverzicht</h1>
    <SearchContainer />
    <LoadingIcon v-if="loading" />
    <PakketTable v-else
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
import { getCurrentInstance } from "@vue/runtime-core";
import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";

@Options({
  components: {
    PakketTable,
    SearchContainer,
    BtnBack,
    LoadingIcon,
  },
})
export default class PakketOverzicht extends Vue {
  private columns: string[] = ["Naam", "Ontvanger", "Status", "Locatie", "Datum"];
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;
  private loading: boolean = true;

  private columnKeys: string[] = [
    "name",
    "receiverId",
    "status",
    "collectionPointId",
    "sender",
  ];
  private packages: Array<Package> = [];

  async created() {
    //let result = await pakketService.getAll();
    pakketService
      .getAll()
      .then((res) => {
        this.packages = res;
        this.loading = false;
      })
      .catch((err) => {
        this.emitter.emit("err", err);
        this.loading = false;
      });
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";
</style>
