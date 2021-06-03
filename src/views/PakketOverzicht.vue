<template>
  <div id="overzicht">
    <btn-back />
    <h1>Pakketoverzicht</h1>
    <SearchContainer />
    <LoadingIcon v-if="loading" />
    <div v-else>
      <PakketTable class="pakket-table"
       :columns="columns"
       :columnKeys="columnKeys"
       v-bind:packages="packages"
      />
      <Pagination v-if="allPackages.length > visibleItemsPerPageCount"
        :page-count="pageCount"
        :visible-items-per-page-count="visibleItemsPerPageCount"
        :visible-pages-count="Math.min(pageCount, 5)"
        @loadPage="loadPage"
      />
    </div>
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
import Pagination from "@/components/standardUi/Pagination/BasePagination.vue"
import mockPackages from "@/data/package_mock";

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
  private allPackages: Array<Package> = [];
  private packages: Array<Package> = [];

  private pageCount = 0;
  private visibleItemsPerPageCount = 10;

  async created() {
    pakketService
      .getAll()
      .then((res) => {
        this.allPackages = res;
        this.pageCount = Math.ceil(this.allPackages.length / this.visibleItemsPerPageCount);
        this.loadPage(1);
        this.loading = false;
      })
      .catch((err: AxiosError) => {
        this.emitter.emit("err", err);
        this.loading = false;
      });
  }

  public loadPage(value){
    const pageIndex = (value - 1) * this.visibleItemsPerPageCount
    this.packages = this.allPackages.slice(pageIndex, pageIndex + this.visibleItemsPerPageCount);
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";
</style>
