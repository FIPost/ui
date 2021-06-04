<template>
  <div id="overzicht">
    <btn-back />
    <h1>Pakketoverzicht</h1>
    <SearchContainer />
    <LoadingIcon v-if="loading" />
    <div v-else>
      <TableComp :items="items" @cell-clicked="CellClicked" />
      <Pagination
        v-if="allPackages.length > visibleItemsPerPageCount"
        :page-count="pageCount"
        :visible-items-per-page-count="visibleItemsPerPageCount"
        :visible-pages-count="Math.min(pageCount, 5)"
        @loadPage="loadPage"
        @nextPage="loadPage('next')"
        @previousPage="loadPage('previous')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { pakketService } from "@/services/pakketService/pakketservice";
import Package from "@/classes/Package";
import SearchContainer from "@/components/SearchContainer.vue";
import BtnBack from "@/components/standardUi/BtnBack.vue";
import { getCurrentInstance } from "@vue/runtime-core";
import { AxiosError } from "axios";
import { ColumnType } from "@/classes/table/ColumnType";
import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
import TableComp from "@/components/standardUi/TableComponent.vue";
import { TableCell } from "@/classes/table/TableCell";
import { dateConverter } from "@/classes/helpers/DateConverter";
import { roomHelper } from "@/classes/Room";
import Pagination from "@/components/standardUi/Pagination/BasePagination.vue";

@Options({
  components: {
    TableComp,
    SearchContainer,
    BtnBack,
    LoadingIcon,
    Pagination,
  },
})
export default class PakketOverzicht extends Vue {
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;
  private loading: boolean = true;

  private allPackages: Array<Package> = new Array<Package>();
  private packages: Array<Package> = new Array<Package>();
  private items: Array<Object> = new Array<Object>();

  private pageCount = 0;
  private visibleItemsPerPageCount = 20;

  beforeMount() {
    this.GetPackages();
  }

  async GetPackages() {
    pakketService
      .getAll()
      .then((res) => {
        this.allPackages = res;
        this.pageCount = Math.ceil(
          this.allPackages.length / this.visibleItemsPerPageCount
        );
        this.loadPage(1);
        this.loading = false;
      })
      .catch((err: AxiosError) => {
        this.emitter.emit("err", err);
        this.loading = false;
      });
  }

  public CellClicked(cell: TableCell): void {
    if (cell) {
      this.$router.push({
        name: "PackagePage",
        params: { id: cell.id },
      });
    }
  }

  //Format objects to display in the table
  GenerateTableObjects(packages: Package[]) {
    this.items = new Array<Object>();
    packages.forEach((value) => {
      this.items.push({
        Naam: {
          id: value.id,
          displayName: value.name,
          type: ColumnType.NAME,
        } as TableCell,
        Ontvanger: {
          id: value.id,
          displayName: value.receiver
            ? value.receiver.name
            : "Kon niet worden opgehaald",
          type: ColumnType.PERSON,
        } as TableCell,
        Status: {
          id: value.id,
          displayName: value.routeFinished ? "Afgeleverd" : "In behandeling",
          type: ColumnType.STATUS,
        } as TableCell,
        "Huidige locatie": {
          id: value.id,
          displayName: value.tickets[0]
            ? roomHelper.getLocationString(value.tickets[0].location)
            : "Kon niet worden opgehaald",
          type: ColumnType.LOCATION,
        } as TableCell,
        "Laatste verandering": {
          id: value.id,
          displayName: value.tickets[0]
            ? this.getDateString(value.tickets[0].finishedAt)
            : "Geen datum",
          type: ColumnType.DATE,
        } as TableCell,
        "Uitgevoerd door": {
          id: value.id,
          displayName: value.tickets[0]
            ? value.tickets[0].completedByPerson
            : "Kon niet gevonden worden",
          type: ColumnType.PERSON,
        } as TableCell,
        Eindlocatie: {
          id: value.id,
          displayName: value.collectionPoint
            ? roomHelper.getLocationString(value.collectionPoint)
            : "Kon niet gevonden worden",
          type: ColumnType.LOCATION,
        } as TableCell,
      });
    });
  }
  getDateString(date: number): string {
    return dateConverter.getDateString(date);
  }
  public loadPage(value: number) {
    const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
    this.packages = this.allPackages.slice(
      pageIndex,
      pageIndex + this.visibleItemsPerPageCount
    );
    this.GenerateTableObjects(this.packages);
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";
</style>
