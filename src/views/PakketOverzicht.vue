<template>
  <div id="overzicht">
    <btn-back />
    <h1>Pakketoverzicht</h1>
    <div class="component-container no-padding">
      <div class="search-main">
        <div class="search-fields">
          <h3 class="text">Filter</h3>
        </div>
        <div class="search-fields">
          <Search @valueChanged="valueChanged" />
        </div>
      </div>
    </div>
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
import SearchBar from "@/components/SearchBar.vue";
import ComboBox from "@/components/standardUi/ComboBox.vue";

@Options({
  components: {
    TableComp,
    BtnBack,
    LoadingIcon,
    Pagination,
    SearchBar,
    ComboBox,
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

  private filter:string = "";


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

  valueChanged(val) {
    this.filter = val;
    this.GenerateTableObjects(this.allPackages);
  }


  GenerateTableObjects(_packages: Package[]) {
    this.items = new Array<Object>();
    let filteredPackages = this.allPackages.filter(PKG => PKG.name.toLowerCase().includes(this.filter.toLowerCase())
        || PKG.receiver.name.toLowerCase().includes(this.filter.toLowerCase())
        || PKG.sender.toLowerCase().includes(this.filter.toLowerCase())
        || PKG.tickets[0].completedByPerson.toLowerCase().includes(this.filter.toLowerCase())
        || this.getDateString(PKG.tickets[0].finishedAt).toLowerCase().includes(this.filter.toLowerCase())
        || roomHelper.getLocationString(PKG.collectionPoint).toLowerCase().includes(this.filter.toLowerCase())
        || roomHelper.getLocationString(PKG.tickets[0].location).toLowerCase().includes(this.filter.toLowerCase()));
    filteredPackages.forEach((value) => {
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

.search-main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 0.2rem;
  justify-content: flex-start;
  padding: 0.2rem;
}

.search-main div {
  margin: 0 0.2rem;
}

.search-fields {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 10px;
  justify-content: flex-start;
  align-items: center;
  padding: 0.75rem;

  .text  {
    text-align: center;
    margin: 0;
    padding: 0;
  }
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
