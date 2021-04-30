<template>
    <AddCity v-if="locationType == city" :cityId="locationId"/>
    <AddBuilding v-if="locationType == building"/>
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
})
export default class LocationInfo extends Vue {
  private city: LocationType = LocationType.CITY;
  private building: LocationType = LocationType.BUILDING;
  private room: LocationType = LocationType.ROOM;

  @Prop()
  public locationId: string = "";

  @Prop(EnumProp(LocationType.CITY, LocationType))
  locationType!: LocationType;
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";
</style>