<template>
  <div id="overzicht">
    <btn-back />
    <h1>Pakketoverzicht</h1>
    <SearchContainer />
    <LoadingIcon v-if="loading" />
    <div
      v-else
      class="component-container overflow"
      style="padding: 0 !important"
    >
      <Table :items="items" @cell-clicked="CellClicked" />
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
import Table from "@/components/standardUi/Table.vue";
import { TableCell } from "@/classes/table/TableCell";
import { dateConverter } from "@/classes/helpers/DateConverter";
import Room from "@/classes/Room";

@Options({
  components: {
    Table,
    SearchContainer,
    BtnBack,
    LoadingIcon,
  },
})
export default class PakketOverzicht extends Vue {
  private columns: string[] = [
    "Naam",
    "Ontvanger",
    "Status",
    "Huidige locatie",
    "Laatste wijziging",
    "Uitgevoerd door",
    "Eindlocatie",
  ];
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;
  private loading: boolean = true;
  public ColumnType: ColumnType = ColumnType.ROOM;

  private items: Array<Object> = new Array<Object>();
  private packages: Array<Package> = new Array<Package>();

  beforeMount() {
    this.GetPackages();
  }

  async GetPackages() {
    pakketService
      .getAll()
      .then((res) => {
        this.packages = res;
        this.GenerateTableObjects(this.packages);
        this.loading = false;
      })
      .catch((err: AxiosError) => {
        this.emitter.emit("err", err);
        this.loading = false;
      });
  }

  public CellClicked(cell: TableCell): void {
    this.$router.push({
        name: "PackagePage",
        params: { id: cell.id },
      });
  }

  //Format objects to display in the table
  GenerateTableObjects(packages: Package[]) {
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
            ? value.tickets[0].location
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
            ? this.getLocationString(value.collectionPoint)
            : "Kon niet gevonden worden",
          type: ColumnType.LOCATION,
        } as TableCell,
      });
    });
  }
  getDateString(date: number): string {
    return dateConverter.getDateString(date);
  }
  getLocationString(room: Room): string {
    return (
      room.building.address.city.name +
      ", " +
      room.building.name +
      ", " +
      room.name
    );
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";
</style>
