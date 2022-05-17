<template>
  <div class="component-container no-padding">
    <div class="search-main">
      <div class="search-fields">
        <h2 class="text">Zoeken</h2>
      </div>

      <div class="search-fields">
        <Search @valueChanged="valueChanged" />
      </div>
    </div>
  </div>
  <div>
    <LoadingIcon v-if="loading" />
    <div v-else>
      <TableComponent
        :items="items"
        :editable="true"
        @cell-clicked="CellClicked"
      />
      <Pagination
        v-if="allRooms.length > visibleItemsPerPageCount"
        :page-count="pageCount"
        :visible-items-per-page-count="visibleItemsPerPageCount"
        :visible-pages-count="Math.min(pageCount, 5)"
        @nextPage="loadPage('next')"
        @previousPage="loadPage('previous')"
        @loadPage="loadPage"
      />
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
import TableComponent from "@/components/standardUi/TableComponent.vue";
import LocationInfo from "@/components/location/LocationInfo.vue";
import LocationModal from "@/components/location/LocationModal.vue";
import { ColumnType } from "@/classes/table/ColumnType";
import Room from "@/classes/Room";
import { roomService } from "@/services/locatieService/roomservice";
import { getCurrentInstance } from "@vue/runtime-core";
import { AxiosError } from "axios";
import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
import { TableCell } from "@/classes/table/TableCell";
import Pagination from "@/components/standardUi/Pagination/BasePagination.vue";
import Search from "@/components/Search.vue";

@Options({
  components: {
    Pagination,
    TableComponent,
    LoadingIcon,
    LocationInfo,
    LocationModal,
    Search,
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
  private allRooms: Array<Room> = new Array<Room>();
  private rooms: Array<Room> = new Array<Room>();

  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  private visibleItemsPerPageCount = 10;
  private pageCount = 0;

  private filter:string = "";

  beforeMount() {
    this.GetRooms();
  }

  async GetRooms() {
    roomService
      .getAll()
      .then((res) => {
        this.allRooms = res;
        this.pageCount = Math.ceil(
          this.allRooms.length / this.visibleItemsPerPageCount
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
  }
  valueChanged(val) {
    this.filter = val;
    this.GenerateTableObjects(this.allRooms);
  }

  GenerateTableObjects(rooms: Room[]) {
    this.items = new Array<Object>();
    let filteredRooms = this.allRooms.filter(room => room.name.toLowerCase().includes(this.filter.toLowerCase()) || room.building.name.toLowerCase().includes(this.filter.toLowerCase()) || room.building.address.street.toLowerCase().includes(this.filter.toLowerCase()) || room.building.address.city.name.toLowerCase().includes(this.filter.toLowerCase()));
    filteredRooms.forEach((value) => {
      this.items.push({
        Stad: {
          id: value.building.address.city.id,
          displayName: value.building.address.city.name,
          type: ColumnType.CITY,
        } as TableCell,
        Gebouw: {
          id: value.building.id,
          displayName:
            value.building.name +
            ", " +
            value.building.address.street +
            " " +
            value.building.address.number,
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

  public loadPage(value: number) {
    const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
    this.rooms = this.allRooms.slice(
      pageIndex,
      pageIndex + this.visibleItemsPerPageCount
    );
    this.GenerateTableObjects(this.rooms);
  }
}



</script>

<style lang="scss" scoped>
@import "src/styling/main.scss";
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

  .text {
    text-align: center;
    margin: 0;
    padding: 0;
  }
}

.search-title {
  text-align: center;
  font-family: $font-family;
  font-weight: 550;
  margin: auto 0 !important;
}

.qr {
  //background-image: url("../assets/QRIcoon.png");
  background-size: contain;
  width: 30px;
  height: 30px;
  margin: auto 15px;
  cursor: pointer;
}

.plus-location {
  font-size: 30px;
  align-self: center;
  margin: 0 20px;
  cursor: pointer;
  color: $green-color;
}

</style>