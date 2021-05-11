<template>
  <div class="component-container" style="padding: 0 !important">
    <Table :items="items" @cell-clicked="CellClicked" />
    <LocationModal v-if="modalOpen" @close-location="CloseModal()">
      <LocationInfo
        :locationType="locationType"
        :locationId="locationId"
        :buildingId="buildingId"
        :roomId="roomId"
        @reload-table="ReloadTable"
      />
    </LocationModal>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@/components/standardUi/Table.vue";
import LocationInfo from "@/components/location/LocationInfo.vue";
import LocationModal from "@/components/location/LocationModal.vue";
import { LocationType } from "@/classes/LocationType";
import Room from "@/classes/Room";
import { roomService } from "@/services/locatieService/roomservice";
import { Emit, Prop } from "vue-property-decorator";
import { getCurrentInstance } from "@vue/runtime-core";
import { TableCell } from "@/classes/TableCell";

@Options({
  components: {
    Table,
    LocationInfo,
    LocationModal,
  },
})
export default class LocationOverviewTable extends Vue {
  /* LocationInfo Modal */
  public locationType: LocationType = LocationType.ROOM;
  public locationId: string = "";
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
      })
      .catch((err) => {
        this.emitter.emit("err", err);
      });
  }

  public CellClicked(cell: TableCell): void {
    this.locationType = cell.type as LocationType;

    if (this.locationType == LocationType.CITY) {
      this.locationId = cell.id;
    } else if (this.locationType == LocationType.BUILDING) {
      this.buildingId = cell.id;
    } else if (this.locationType == LocationType.ROOM) {
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
          type: LocationType.CITY,
        } as TableCell,
        Gebouw: {
          id: value.building.id,
          displayName: value.building.name,
          type: LocationType.BUILDING,
        } as TableCell,
        Ruimte: {
          id: value.id,
          displayName: value.name,
          type: LocationType.ROOM,
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