<template>
  <div id="overzicht">
    <btn-back />
    <h1>Pakketoverzicht</h1>
    <SearchContainer />
    <LoadingIcon v-if="loading" />
    <PakketTable class="pakket-table" v-else
      :columns="columns"
      :columnKeys="columnKeys"
      v-bind:packages="packages"
    />
    <Pagination
        :currentPage="currentPage"
        :pageCount="pageCount"
        @nextPage="pageChangeHandleValue('next')"
        @previousPage="pageChangeHandleValue('previous')"
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
import { AxiosError } from "axios";
import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
import Pagination from "@/components/Pagination.vue"

@Options({
  components: {
    PakketTable,
    SearchContainer,
    BtnBack,
    LoadingIcon,
    Pagination,
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

  private visibleItemsPerPageCount = 5;
  private pageCount = 0;
  private currentPage = 1;

  async created() {
    pakketService
      .getAll()
      .then((res) => {
        this.packages = res;
        this.pageCount = Math.ceil(this.packages.length / this.visibleItemsPerPageCount);
        this.loading = false;
      })
      .catch((err: AxiosError) => {
        this.emitter.emit("err", err);
        this.loading = false;
      });
  }

  public pageChangeHandleValue(value){
    switch(value){
      case 'next':
        this.currentPage += 1;
        break
      case 'previous':
        this.currentPage -= 1;
        break
      default:
        this.currentPage = value;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";
</style>
