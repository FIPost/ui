<template>
  <div id="overzicht">
    <btn-back />
    <h1>Pakketoverzicht</h1>
    <SearchContainer />
    <PakketTable
      :columns="columns"
      :columnKeys="columnKeys"
      v-bind:packages="packageModels"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import PakketTable from "@/components/PakketTable.vue";
import { pakketService } from "@/services/pakketService/pakketservice";
import PackageModel from "@/classes/requests/PackageRequest";
import SearchContainer from "@/components/SearchContainer.vue";
import BtnBack from "@/components/standardUi/BtnBack.vue";
import { getCurrentInstance } from "@vue/runtime-core";

@Options({
  components: {
    PakketTable,
    SearchContainer,
    BtnBack,
  },
})
export default class PakketOverzicht extends Vue {
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  private columns: string[] = ["ID", "Ontvanger", "Status", "Locatie", "Datum"];
  private columnKeys: string[] = [
    "id",
    "receiverId",
    "status",
    "collectionPointId",
    "sender",
  ];
  private packageModels: Array<PackageModel> = [];

  async created() {
    //let result = await pakketService.getAll();
    pakketService
      .getAll()
      .then((res) => {
        this.packageModels = res;
      })
      .catch((err) => {
        this.emitter.emit("err", err);
      });
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";
</style>
