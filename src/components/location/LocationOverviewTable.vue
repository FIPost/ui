<template>
  <div class="component-container" style="padding: 0 !important">
    <Table :items="items" />
    <LocationModal v-if="modalOpen" @closeModal="CloseModal()">
      <LocationInfo :locationType="locationType" />
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

  public modalOpen: boolean = true;
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

  //Format objects to display in the table
  GenerateTableObjects(rooms: Room[]) {
    rooms.forEach((value) => {
      this.items.push({
        Stad: value.building.address.city.name,
        Gebouw: value.building.name,
        Ruimte: value.name,
      });
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";
</style>