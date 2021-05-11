<template>
    <AddCity v-if="locationType == city" :cityId="locationId" @location-changed="ReloadTable" :title="updateCityTitle"/>
    <AddBuilding v-if="locationType == building" :buildingId="buildingId" :title="updateBuildingTitle"/>
    <AddRoom  v-if="locationType == room"/>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import AddCity from "@/components/locationRegistration/AddCity.vue";
import { Emit, Prop } from "vue-property-decorator";
import { LocationType } from "@/classes/LocationType";
import AddBuilding from "@/components/locationRegistration/AddBuilding.vue";
import AddRoom from "@/components/locationRegistration/AddRoom.vue";

function EnumProp(d: string | number, e: Record<any, any>) {
  // <- Record is changed
  return {
    default: d,
    validator: (v) => e[v] !== undefined,
  };
}

@Options({
  components: {
    AddCity,
    AddBuilding,
    AddRoom
  },
  emits: [
    "reload-table"
  ]
})
export default class LocationInfo extends Vue {
  private city: LocationType = LocationType.CITY;
  private building: LocationType = LocationType.BUILDING;
  private room: LocationType = LocationType.ROOM;

  private updateCityTitle: string = "Wijzig een stad";
  private updateBuildingTitle: string = "Wijzig een gebouw";
  private updateRoomTitle: string = "Wijzig een kamer";

  @Prop()
  public locationId: string = "";

  @Prop()
  public buildingId: string = "";

  @Prop()
  public roomId: string = "";

  @Prop(EnumProp(LocationType.CITY, LocationType))
  locationType!: LocationType;

  ReloadTable(): void {
    this.$emit("reload-table");
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";
</style>