<template>
  <div>
    <LoadingIcon v-if="loading" />
    <div v-else class="component-container overflow" style="padding: 0 !important">
      <Table :items="items" @cell-clicked="CellClicked" />
      <LocationModal v-if="modalOpen" @close-location="CloseModal()">
        <LocationInfo
          :ColumnType="ColumnType"
          :cityId="cityId"
          :buildingId="buildingId"
          :roomId="roomId"
          @reload-table="ReloadTable"
        />
      </LocationModal>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@/components/standardUi/Table.vue";
import LocationInfo from "@/components/location/LocationInfo.vue";
import LocationModal from "@/components/location/LocationModal.vue";
import { ColumnType } from "@/classes/table/ColumnType";
import Room from "@/classes/Room";
import { roomService } from "@/services/locatieService/roomservice";
import { getCurrentInstance } from "@vue/runtime-core";
import { AxiosError } from "axios";
import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
import { TableCell } from "@/classes/table/TableCell";

@Options({
  components: {
    Table,
    LoadingIcon,
    LocationInfo,
    LocationModal,
  },
})
export default class LocationOverviewTable extends Vue {
  private loading: boolean = true;
  private error: boolean = false;

  /* LocationInfo Modal */
  public ColumnType: ColumnType = ColumnType.ROOM;
  public cityId: string = "";
  public buildingId: string = "";
  public roomId: string = "";

  public modalOpen: boolean = false;
  public CloseModal(): void {
    this.modalOpen = false;
  }

  /* LocationTable */
  private items: Array<Object> = new Array<Object>();
  private rooms: Array<Room> = new Array<Room>();
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  beforeMount() {
    this.GetRooms();
  }

  async GetRooms() {
    roomService
      .getAll()
      .then((res) => {
        this.rooms = res;
        this.GenerateTableObjects(this.rooms);
        this.loading = false;
      })
      .catch((err: AxiosError) => {
        this.emitter.emit("err", err);
        this.loading = false;
      });
  }

  public CellClicked(cell: TableCell): void {
    this.ColumnType = cell.type as ColumnType;

    if (this.ColumnType == ColumnType.CITY) {
      this.cityId = cell.id;
    } else if (this.ColumnType == ColumnType.BUILDING) {
      this.buildingId = cell.id;
    } else if (this.ColumnType == ColumnType.ROOM) {
      this.roomId = cell.id;
    } else {
      return;
    }
    this.modalOpen = true;
  }

  //Format objects to display in the table
  GenerateTableObjects(rooms: Room[]) {
    rooms.forEach((value) => {
      this.items.push({
        Stad: {
          id: value.building.address.city.id,
          displayName: value.building.address.city.name,
          type: ColumnType.CITY,
        } as TableCell,
        Gebouw: {
          id: value.building.id,
          displayName: value.building.name + ", " + value.building.address.street + " " + value.building.address.number,
          type: ColumnType.BUILDING,
        } as TableCell,
        Ruimte: {
          id: value.id,
          displayName: value.name,
          type: ColumnType.ROOM,
        } as TableCell,
      });
    });
  }

  ReloadTable(): void {
    this.items = [];
    this.modalOpen = false;
    this.GetRooms();
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";
</style>